/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";
import { AspectRatio } from "../components/StartScreen";

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

const getAspectRatioPrompt = (aspectRatio: AspectRatio): string => {
    switch (aspectRatio) {
        case '9:16':
            return 'The output image must have a 9:16 aspect ratio (portrait orientation, 1080x1920 pixels or equivalent). This is perfect for Instagram Reels and TikTok videos.';
        case '1:1':
            return 'The output image must have a 1:1 aspect ratio (perfect square, 1080x1080 pixels or equivalent). This is ideal for Instagram posts.';
        case '4:5':
            return 'The output image must have a 4:5 aspect ratio (portrait orientation, 1080x1350 pixels or equivalent). This is perfect for Instagram portrait posts.';
        default:
            return 'The output image must have a 4:5 aspect ratio (portrait orientation, 1080x1350 pixels or equivalent). This is perfect for Instagram portrait posts.';
    }
};

const getBlankAspectRatioImageUrl = (aspectRatio: AspectRatio): string => {
    switch (aspectRatio) {
        case '9:16':
            return 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/9_16.png';
        case '1:1':
            return 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/1_1.png';
        case '4:5':
            return 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/4_5.png';
        default:
            return 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/4_5.png';
    }
};

const fetchImageAndConvertToPart = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = response.headers.get('content-type') || 'image/png';
    return { inlineData: { mimeType, data: base64String } };
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const model = 'gemini-2.5-flash-image-preview';

const retryWithFallback = async <T>(
    primaryFn: () => Promise<T>,
    fallbackFn?: () => Promise<T>,
    maxRetries: number = 2
): Promise<T> => {
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await primaryFn();
        } catch (error: any) {
            lastError = error;
            console.log(`Attempt ${attempt} failed:`, error);

            // If it's a timeout/deadline error and we have retries left, wait and retry
            if (error.message?.includes('Deadline expired') || error.message?.includes('UNAVAILABLE')) {
                if (attempt < maxRetries) {
                    console.log(`Retrying in ${attempt * 2} seconds...`);
                    await new Promise(resolve => setTimeout(resolve, attempt * 2000));
                    continue;
                }
            }

            // If not a timeout error or out of retries, break
            break;
        }
    }

    // If we have a fallback and the primary failed with timeout, try fallback
    if (fallbackFn && lastError?.message?.includes('Deadline expired')) {
        try {
            console.log('Trying fallback approach...');
            return await fallbackFn();
        } catch (fallbackError) {
            console.log('Fallback also failed:', fallbackError);
        }
    }

    throw lastError;
};

export const generateModelImage = async (userImage: File, aspectRatio: AspectRatio = '4:5'): Promise<string> => {
    const userImagePart = await fileToPart(userImage);

    const primaryGeneration = async () => {
        const aspectRatioPrompt = getAspectRatioPrompt(aspectRatio);
        const prompt = `You are an expert fashion photographer AI. Transform the person in this image into a full-body fashion model photo suitable for an e-commerce website. The background must be a clean, neutral studio backdrop (light gray, #f0f0f0). The person should have a neutral, professional model expression. Preserve the person's identity, unique features, and body type, but place them in a standard, relaxed standing model pose. The final image must be photorealistic. ${aspectRatioPrompt} Return ONLY the final image.`;
        const response = await ai.models.generateContent({
            model,
            contents: { parts: [userImagePart, { text: prompt }] },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        return handleApiResponse(response);
    };

    const fallbackGeneration = async () => {
        // Simpler prompt without specific aspect ratio requirements
        const prompt = `You are an expert fashion photographer AI. Transform the person in this image into a full-body fashion model photo suitable for an e-commerce website. The background must be a clean, neutral studio backdrop (light gray, #f0f0f0). The person should have a neutral, professional model expression. Preserve the person's identity, unique features, and body type, but place them in a standard, relaxed standing model pose. The final image must be photorealistic. Return ONLY the final image.`;
        const response = await ai.models.generateContent({
            model,
            contents: { parts: [userImagePart, { text: prompt }] },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        return handleApiResponse(response);
    };

    return retryWithFallback(primaryGeneration, fallbackGeneration);
};

export const generateVirtualTryOnImage = async (modelImageUrl: string, garmentImage: File, aspectRatio: AspectRatio = '4:5'): Promise<string> => {
    const modelImagePart = dataUrlToPart(modelImageUrl);
    const garmentImagePart = await fileToPart(garmentImage);

    // Fetch the blank aspect ratio image to enforce the output dimensions
    const blankImageUrl = getBlankAspectRatioImageUrl(aspectRatio);
    const blankImagePart = await fetchImageAndConvertToPart(blankImageUrl);

    const primaryGeneration = async () => {
        const aspectRatioPrompt = getAspectRatioPrompt(aspectRatio);
        const prompt = `You are an expert virtual try-on AI. You will be given a 'model image', a 'garment image', and a 'blank aspect ratio reference'. Your task is to create a new photorealistic image where the person from the 'model image' is wearing the clothing from the 'garment image'.

**Crucial Rules:**
1.  **Complete Garment Replacement:** You MUST completely REMOVE and REPLACE the outfit worn by the person in the 'model image' with all items seen in the new outfit. No part of the original clothing (e.g., collars, sleeves, patterns) should be visible in the final image.
2.  **Preserve the Model:** The person's face, hair, body shape, and pose from the 'model image' MUST remain unchanged.
3.  **Preserve the Background:** The entire background from the 'model image' MUST be preserved perfectly.
4.  **Apply the Garment:** Realistically fit the new outfit onto the person. It should adapt to their pose with natural folds, shadows, and lighting consistent with the original scene.
5.  **Aspect Ratio:** ${aspectRatioPrompt} The output image MUST match the exact dimensions and aspect ratio of the blank reference image provided.
6.  **Output:** Return ONLY the final, edited image. Do not include any text.`;
        const response = await ai.models.generateContent({
            model,
            contents: { parts: [modelImagePart, garmentImagePart, blankImagePart, { text: prompt }] },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        return handleApiResponse(response);
    };

    return retryWithFallback(primaryGeneration);
};

export const generatePoseVariation = async (tryOnImageUrl: string, poseInstruction: string, aspectRatio: AspectRatio = '4:5'): Promise<string> => {
    const tryOnImagePart = dataUrlToPart(tryOnImageUrl);

    // Fetch the blank aspect ratio image to enforce the output dimensions
    const blankImageUrl = getBlankAspectRatioImageUrl(aspectRatio);
    const blankImagePart = await fetchImageAndConvertToPart(blankImageUrl);

    const primaryGeneration = async () => {
        const aspectRatioPrompt = getAspectRatioPrompt(aspectRatio);
        const prompt = `You are an expert fashion photographer AI. Take this image and regenerate it from a different perspective. The person, clothing, and background style must remain identical. The new perspective should be: "${poseInstruction}". ${aspectRatioPrompt} The output image MUST match the exact dimensions and aspect ratio of the blank reference image provided. Return ONLY the final image.`;
        const response = await ai.models.generateContent({
            model,
            contents: { parts: [tryOnImagePart, blankImagePart, { text: prompt }] },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        return handleApiResponse(response);
    };

    return retryWithFallback(primaryGeneration);
};

export const regenerateImageWithAspectRatio = async (imageUrl: string, aspectRatio: AspectRatio): Promise<string> => {
    const imagePart = dataUrlToPart(imageUrl);

    // Fetch the blank aspect ratio image to enforce the output dimensions
    const blankImageUrl = getBlankAspectRatioImageUrl(aspectRatio);
    const blankImagePart = await fetchImageAndConvertToPart(blankImageUrl);

    const primaryGeneration = async () => {
        const aspectRatioPrompt = getAspectRatioPrompt(aspectRatio);
        const prompt = `You are an expert AI image processor. Take this image and regenerate it with the exact same content, person, clothing, pose, and background, but change only the aspect ratio. The person, their outfit, pose, facial features, and background must remain identical. ${aspectRatioPrompt} The output image MUST match the exact dimensions and aspect ratio of the blank reference image provided. Return ONLY the final image.`;
        const response = await ai.models.generateContent({
            model,
            contents: { parts: [imagePart, blankImagePart, { text: prompt }] },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        return handleApiResponse(response);
    };

    return retryWithFallback(primaryGeneration);
};