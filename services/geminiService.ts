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
const PRIMARY_MODEL = 'gemini-3-pro-image-preview';
const FALLBACK_MODEL = 'gemini-2.5-flash-image';

/**
 * Attempts to generate content with the primary model, retrying once on failure,
 * then falls back to the fallback model if the primary remains unavailable.
 */
const generateWithFallback = async (
    contentParts: Array<any>,
    primaryModel: string = PRIMARY_MODEL,
    fallbackModel: string = FALLBACK_MODEL,
    configOverride?: any
): Promise<string> => {
    const config = configOverride || {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
    };

    // Attempt 1: Primary model
    try {
        const response = await ai.models.generateContent({
            model: primaryModel,
            contents: { parts: contentParts },
            config,
        });
        return handleApiResponse(response);
    } catch (err: any) {
        const isServiceError = err?.status === 503 || err?.status === 429 ||
            err?.message?.includes('503') || err?.message?.includes('overloaded') ||
            err?.message?.includes('Service Unavailable') || err?.message?.includes('UNAVAILABLE') ||
            err?.message?.includes('429') || err?.message?.includes('rate limit');

        if (!isServiceError) throw err;

        console.warn(`Primary model (${primaryModel}) unavailable, retrying once...`);
    }

    // Attempt 2: Retry primary model after a short delay
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const response = await ai.models.generateContent({
            model: primaryModel,
            contents: { parts: contentParts },
            config,
        });
        return handleApiResponse(response);
    } catch (err: any) {
        console.warn(`Primary model (${primaryModel}) still unavailable, falling back to ${fallbackModel}...`);
    }

    // Attempt 3: Fallback model
    const response = await ai.models.generateContent({
        model: fallbackModel,
        contents: { parts: contentParts },
        config,
    });
    return handleApiResponse(response);
};

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

export const generateModelImage = async (faceImage: File, bodyImage?: File): Promise<string> => {
    const faceImagePart = await fileToPart(faceImage);
    const parts: Array<{ inlineData: { mimeType: string; data: string } } | { text: string }> = [faceImagePart];

    if (bodyImage) {
        const bodyImagePart = await fileToPart(bodyImage);
        parts.push(bodyImagePart);
        parts.push({ text: "You are an expert fashion photographer AI. You are given two images: the first is a face/selfie photo and the second is a full body photo of the same person. Using the face from the first image and the body proportions from the second image, create a full-body fashion model photo suitable for an e-commerce website. The background must be a clean, neutral studio backdrop (light gray, #f0f0f0). The person should have a neutral, professional model expression. Preserve the person's identity, unique facial features, and body type, but place them in a standard, relaxed standing model pose. The final image must be photorealistic and MUST be exactly 1080 pixels wide by 1350 pixels tall (4:5 aspect ratio). Return ONLY the final image." });
    } else {
        parts.push({ text: "You are an expert fashion photographer AI. Transform the person in this image into a full-body fashion model photo suitable for an e-commerce website. The background must be a clean, neutral studio backdrop (light gray, #f0f0f0). The person should have a neutral, professional model expression. Preserve the person's identity, unique features, and body type, but place them in a standard, relaxed standing model pose. The final image must be photorealistic and MUST be exactly 1080 pixels wide by 1350 pixels tall (4:5 aspect ratio). Return ONLY the final image." });
    }

    return generateWithFallback(parts);
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
    return generateWithFallback([modelImagePart, garmentImagePart, { text: prompt }]);
};

export const generatePoseVariation = async (tryOnImageUrl: string, poseInstruction: string): Promise<string> => {
    const tryOnImagePart = dataUrlToPart(tryOnImageUrl);
    const prompt = `You are an expert fashion photographer AI. Take this image and regenerate it from a different perspective. The person, clothing, and background style must remain identical. The new perspective should be: "${poseInstruction}". The output image MUST be exactly 1080 pixels wide by 1350 pixels tall (4:5 aspect ratio), maintaining the exact same dimensions as the input image. Return ONLY the final image.`;
    return generateWithFallback([tryOnImagePart, { text: prompt }]);
};

export const generateCustomModelFromMeasurements = async (
    faceImage: File,
    bodyImage: File,
    measurements: UserMeasurements,
    additionalImages?: File[],
    modelName?: 'gemini-2.5-flash-image' | 'gemini-3-pro-image-preview'
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
        model: modelName || PRIMARY_MODEL,
        contents: { parts: contentParts },
        config: { responseModalities: [Modality.IMAGE, Modality.TEXT] },
    });
    return handleApiResponse(response);
};

export const generateDirectVirtualTryOn = async (
    faceImage: File,
    bodyImage: File,
    garmentImage: File,
    additionalUserImages?: File[],
    resolution: '1K' | '2K' | '4K' = '2K'
): Promise<string> => {
    // Convert all images to parts
    const faceImagePart = await fileToPart(faceImage);
    const bodyImagePart = await fileToPart(bodyImage);
    const garmentImagePart = await fileToPart(garmentImage);
    const additionalParts = additionalUserImages
        ? await Promise.all(additionalUserImages.map(fileToPart))
        : [];

    // Calculate aspect ratio based on resolution
    const aspectRatio = '4:5'; // Standard e-commerce ratio (1080x1350)

    // Build enhanced prompt combining model generation + virtual try-on in one step
    const prompt = `You are an expert virtual fashion photographer and try-on AI. Create a photorealistic full-body fashion photo where the person from the reference images is wearing the garment from the garment image.

**Reference Images Provided:**
- Image 1 (Face): Facial likeness reference - preserve this person's unique facial features, skin tone, hair, and identity
- Image 2 (Body): Full body reference - use this for understanding body proportions, posture, and shape
- Image 3 (Garment): The clothing item to be worn by the person
${additionalUserImages?.length ? `- Additional reference images (${additionalUserImages.length}): Use these for more accurate representation of the person` : ''}

**Critical Requirements:**

1. **Complete Identity Preservation**:
   - The face MUST perfectly match the facial reference images (features, skin tone, expression, hair)
   - Maintain the person's body type and proportions from the body reference image
   - The person should look EXACTLY like themselves, just wearing the new garment

2. **Complete Garment Replacement**:
   - REMOVE all original clothing from the person
   - REPLACE it entirely with the garment from the garment image
   - The garment should fit naturally on the person's body
   - Preserve the exact style, color, pattern, and details of the garment
   - Adapt the garment to the person's pose with realistic wrinkles, folds, and draping
   - Ensure proper shadows and lighting consistent with the garment material

3. **Professional Model Pose**:
   - Place the person in a natural, relaxed standing model pose suitable for e-commerce
   - The pose should showcase the garment effectively
   - Natural, confident posture with good balance

4. **Studio Environment**:
   - Clean, neutral studio backdrop (light gray, #f0f0f0)
   - Professional studio lighting that highlights both the person and the garment
   - Soft, even lighting with appropriate shadows

5. **Photorealistic Quality**:
   - The final image must be completely photorealistic and indistinguishable from a professional studio photograph
   - Seamless integration between the person and the garment
   - Natural skin tones, fabric textures, and lighting

6. **Image Composition**:
   - Full-body shot showing the complete garment
   - Person should be centered and well-framed
   - Professional fashion photography composition

Return ONLY the final photorealistic virtual try-on image showing this person wearing the garment.`;

    // Prepare content parts array
    const contentParts = [
        { text: prompt },
        faceImagePart,
        bodyImagePart,
        garmentImagePart,
        ...additionalParts
    ];

    return generateWithFallback(contentParts);
};

export const generateSimplifiedVirtualTryOn = async (
    customerImages: File[],
    garmentImage: File,
    resolution: '1K' | '2K' | '4K' = '2K'
): Promise<string> => {
    // Convert all images to parts
    const customerImageParts = await Promise.all(customerImages.map(fileToPart));
    const garmentImagePart = await fileToPart(garmentImage);

    // Calculate aspect ratio based on resolution
    const aspectRatio = '4:5'; // Standard e-commerce ratio (1080x1350)

    // Build simplified prompt for testing
    const prompt = `You are an expert virtual fashion photographer and try-on AI. Create a photorealistic full-body fashion photo where the person from the customer reference images is wearing the garment from the garment image.

**Reference Images Provided:**
- Customer Images (${customerImages.length}): Use ALL of these images to understand the person's face, body proportions, and overall appearance
- Garment Image (1): The clothing item to be worn by the person

**Critical Requirements:**

1. **Complete Identity Preservation**:
   - The face MUST perfectly match the customer reference images (features, skin tone, expression, hair)
   - Maintain the person's body type and proportions from the customer images
   - The person should look EXACTLY like themselves, just wearing the new garment

2. **Complete Garment Replacement**:
   - REMOVE all original clothing from the person
   - REPLACE it entirely with the garment from the garment image
   - The garment should fit naturally on the person's body
   - Preserve the exact style, color, pattern, and details of the garment
   - Adapt the garment to the person's pose with realistic wrinkles, folds, and draping
   - Ensure proper shadows and lighting consistent with the garment material

3. **Professional Model Pose**:
   - Place the person in a natural, relaxed standing model pose suitable for e-commerce
   - The pose should showcase the garment effectively
   - Natural, confident posture with good balance

4. **Studio Environment**:
   - Clean, neutral studio backdrop (light gray, #f0f0f0)
   - Professional studio lighting that highlights both the person and the garment
   - Soft, even lighting with appropriate shadows

5. **Photorealistic Quality**:
   - The final image must be completely photorealistic and indistinguishable from a professional studio photograph
   - Seamless integration between the person and the garment
   - Natural skin tones, fabric textures, and lighting

6. **Image Composition**:
   - Full-body shot showing the complete garment
   - Person should be centered and well-framed
   - Professional fashion photography composition

Return ONLY the final photorealistic virtual try-on image showing this person wearing the garment.`;

    // Prepare content parts array - customer images first, then garment
    const contentParts = [
        { text: prompt },
        ...customerImageParts,
        garmentImagePart
    ];

    const response = await ai.models.generateContent({
        model: PRIMARY_MODEL,
        contents: { parts: contentParts },
        config: { responseModalities: [Modality.IMAGE, Modality.TEXT] },
    });
    return handleApiResponse(response);
};

export const generateSimplifiedCustomModel = async (
    referenceImages: File[],
    modelName?: 'gemini-2.5-flash-image' | 'gemini-3-pro-image-preview'
): Promise<string> => {
    // Convert all images to parts
    const imageParts = await Promise.all(referenceImages.map(fileToPart));

    // Build simplified prompt without measurements
    const prompt = `You are an expert fashion photographer AI. Create a full-body professional studio model photo using the provided reference images.

**Reference Images Provided:**
- ${referenceImages.length} reference image${referenceImages.length > 1 ? 's' : ''}: Use ALL of these images to understand the person's unique facial features, body proportions, skin tone, hair, and overall appearance

**Critical Requirements:**

1. **Complete Identity Preservation**:
   - The face MUST perfectly match the reference images (facial features, expression, skin tone, hair, identity)
   - Maintain the person's natural body type and proportions as shown in the reference images
   - The person should look EXACTLY like themselves in a professional model pose

2. **Professional Model Pose**:
   - Place the person in a natural, relaxed standing model pose suitable for e-commerce fashion photography
   - Natural, confident posture with good balance
   - Arms relaxed at sides or one hand on hip
   - Straight posture showcasing body proportions

3. **Studio Environment**:
   - Clean, neutral studio backdrop (light gray, #f0f0f0)
   - Professional studio lighting with soft, even illumination
   - Appropriate shadows that highlight body contours naturally

4. **Photorealistic Quality**:
   - The final image must be completely photorealistic and indistinguishable from a real studio photograph
   - Natural skin tones, textures, and lighting
   - Professional fashion photography quality

5. **Image Composition**:
   - Full-body shot from head to toe
   - Person centered and well-framed
   - Professional e-commerce model photography composition
   - Exact dimensions: 1080 pixels wide by 1350 pixels tall (4:5 aspect ratio)

**Clothing:**
- Simple, neutral clothing (plain t-shirt or simple top, neutral pants or jeans)
- Nothing that distracts from the person's appearance
- Clothing should fit naturally and look professional

Return ONLY the final photorealistic studio model image.`;

    // Prepare content parts array
    const contentParts = [
        ...imageParts,
        { text: prompt }
    ];

    const response = await ai.models.generateContent({
        model: modelName || PRIMARY_MODEL,
        contents: { parts: contentParts },
        config: { responseModalities: [Modality.IMAGE, Modality.TEXT] },
    });
    return handleApiResponse(response);
};