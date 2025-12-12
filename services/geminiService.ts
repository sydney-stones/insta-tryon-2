/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

const fileToPart = async (file: File) => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
    const { mimeType, data } = dataUrlToParts(dataUrl);
    return { inlineData: { mimeType, data } };
};

const dataUrlToParts = (dataUrl: string) => {
    const arr = dataUrl.split(',');
    if (arr.length < 2) throw new Error("Invalid data URL");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch || !mimeMatch[1]) throw new Error("Could not parse MIME type from data URL");
    return { mimeType: mimeMatch[1], data: arr[1] };
}

const dataUrlToPart = (dataUrl: string) => {
    const { mimeType, data } = dataUrlToParts(dataUrl);
    return { inlineData: { mimeType, data } };
}

const handleApiResponse = (response: GenerateContentResponse): string => {
    if (response.promptFeedback?.blockReason) {
        const { blockReason, blockReasonMessage } = response.promptFeedback;
        const errorMessage = `Request was blocked. Reason: ${blockReason}. ${blockReasonMessage || ''}`;
        throw new Error(errorMessage);
    }

    // Find the first image part in any candidate
    for (const candidate of response.candidates ?? []) {
        const imagePart = candidate.content?.parts?.find(part => part.inlineData);
        if (imagePart?.inlineData) {
            const { mimeType, data } = imagePart.inlineData;
            return `data:${mimeType};base64,${data}`;
        }
    }

    const finishReason = response.candidates?.[0]?.finishReason;
    if (finishReason && finishReason !== 'STOP') {
        const errorMessage = `Image generation stopped unexpectedly. Reason: ${finishReason}. This often relates to safety settings.`;
        throw new Error(errorMessage);
    }
    const textFeedback = response.text?.trim();
    const errorMessage = `The AI model did not return an image. ` + (textFeedback ? `The model responded with text: "${textFeedback}"` : "This can happen due to safety filters or if the request is too complex. Please try a different image.");
    throw new Error(errorMessage);
};

// Use environment variable for API key - NEVER commit the actual key
// Support both Vite (VITE_GEMINI_API_KEY) and Vercel (GEMINI_API_KEY) naming conventions
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

if (!apiKey || apiKey === 'NULL' || apiKey === 'your_gemini_api_key_here') {
  console.warn('WARNING: Gemini API key is not configured. Virtual try-on features will not work.');
  console.warn('Set either VITE_GEMINI_API_KEY (for local dev) or GEMINI_API_KEY (for Vercel) environment variable.');
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });
const model = 'gemini-2.5-flash-image-preview';

export interface UserMeasurements {
  height: number;      // cm
  weight: number;      // kg
  chest: number;       // cm
  waist: number;       // cm
  hips: number;        // cm
  shoulder: number;    // cm
  inseam: number;      // cm
  armLength: number;   // cm
}

export const generateModelImage = async (userImage: File): Promise<string> => {
    const userImagePart = await fileToPart(userImage);
    const prompt = "You are an expert fashion photographer AI. Transform the person in this image into a full-body fashion model photo suitable for an e-commerce website. The background must be a clean, neutral studio backdrop (light gray, #f0f0f0). The person should have a neutral, professional model expression. Preserve the person's identity, unique features, and body type, but place them in a standard, relaxed standing model pose. The final image must be photorealistic and MUST be exactly 1080 pixels wide by 1350 pixels tall (4:5 aspect ratio). Return ONLY the final image.";
    const response = await ai.models.generateContent({
        model,
        contents: { parts: [userImagePart, { text: prompt }] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    return handleApiResponse(response);
};

export const generateVirtualTryOnImage = async (modelImageUrl: string, garmentImage: File): Promise<string> => {
    const modelImagePart = dataUrlToPart(modelImageUrl);
    const garmentImagePart = await fileToPart(garmentImage);
    const prompt = `You are an expert virtual try-on AI. You will be given a 'model image' and a 'garment image'. Your task is to create a new photorealistic image where the person from the 'model image' is wearing the clothing from the 'garment image'.

**Crucial Rules:**
1.  **Complete Garment Replacement:** You MUST completely REMOVE and REPLACE the outfit worn by the person in the 'model image' with all items seen in the new outfit. No part of the original clothing (e.g., collars, sleeves, patterns) should be visible in the final image.
2.  **Preserve the Model:** The person's face, hair, body shape, and pose from the 'model image' MUST remain unchanged.
3.  **Preserve the Background:** The entire background from the 'model image' MUST be preserved perfectly.
4.  **Apply the Garment:** Realistically fit the new outfit onto the person. It should adapt to their pose with natural folds, shadows, and lighting consistent with the original scene.
5.  **Exact Dimensions:** The output image MUST be exactly 1080 pixels wide by 1350 pixels tall (4:5 aspect ratio), matching the exact dimensions of the model image.
6.  **Output:** Return ONLY the final, edited image. Do not include any text.`;
    const response = await ai.models.generateContent({
        model,
        contents: { parts: [modelImagePart, garmentImagePart, { text: prompt }] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    return handleApiResponse(response);
};

export const generatePoseVariation = async (tryOnImageUrl: string, poseInstruction: string): Promise<string> => {
    const tryOnImagePart = dataUrlToPart(tryOnImageUrl);
    const prompt = `You are an expert fashion photographer AI. Take this image and regenerate it from a different perspective. The person, clothing, and background style must remain identical. The new perspective should be: "${poseInstruction}". The output image MUST be exactly 1080 pixels wide by 1350 pixels tall (4:5 aspect ratio), maintaining the exact same dimensions as the input image. Return ONLY the final image.`;
    const response = await ai.models.generateContent({
        model,
        contents: { parts: [tryOnImagePart, { text: prompt }] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    return handleApiResponse(response);
};

export const generateCustomModelFromMeasurements = async (
    faceImage: File,
    bodyImage: File,
    measurements: UserMeasurements,
    additionalImages?: File[],
    modelName?: 'gemini-2.5-flash-image-preview' | 'gemini-3-pro-image-preview'
): Promise<string> => {
    // Convert all images to parts
    const faceImagePart = await fileToPart(faceImage);
    const bodyImagePart = await fileToPart(bodyImage);
    const additionalParts = additionalImages
        ? await Promise.all(additionalImages.map(fileToPart))
        : [];

    // Build enhanced prompt with measurements
    const prompt = `You are an expert fashion photographer AI. Create a full-body professional studio model photo using the provided reference images and exact measurements.

**Reference Images:**
- Image 1: Facial likeness reference - preserve this person's unique facial features, skin tone, and identity
- Image 2: Full body reference - use this for understanding body proportions and posture
${additionalImages?.length ? `- Additional images: Use these for more accurate representation` : ''}

**Exact Body Measurements:**
- Height: ${measurements.height} cm
- Weight: ${measurements.weight} kg
- Chest/Bust: ${measurements.chest} cm
- Waist: ${measurements.waist} cm
- Hips: ${measurements.hips} cm
- Shoulder width: ${measurements.shoulder} cm
- Inseam: ${measurements.inseam} cm
- Arm length: ${measurements.armLength} cm

**Requirements:**
1. **Identity Preservation**: The face must perfectly match Image 1's facial features, expression, skin tone, and identity
2. **Accurate Proportions**: Use the exact measurements provided to create a realistic body that matches these dimensions precisely
3. **Professional Pose**: Place the person in a natural, relaxed standing model pose suitable for e-commerce fashion photography
4. **Studio Environment**: Clean, neutral studio backdrop (light gray, #f0f0f0) with professional studio lighting
5. **Photorealistic Quality**: The final image must be completely photorealistic and indistinguishable from a real studio photograph
6. **Exact Dimensions**: Output MUST be exactly 1080 pixels wide by 1350 pixels tall (4:5 aspect ratio)

Return ONLY the final photorealistic studio model image.`;

    // Prepare content parts array
    const contentParts = [
        faceImagePart,
        bodyImagePart,
        ...additionalParts,
        { text: prompt }
    ];

    const response = await ai.models.generateContent({
        model: modelName || 'gemini-3-pro-image-preview',
        contents: { parts: contentParts },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    return handleApiResponse(response);
};