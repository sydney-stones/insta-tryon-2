/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFriendlyErrorMessage(error: unknown, context: string): string {
    let rawMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
        rawMessage = error.message;
    } else if (typeof error === 'string') {
        rawMessage = error;
    } else if (error) {
        rawMessage = String(error);
    }

    // Handle JSON-formatted error responses
    try {
        const errorJson = JSON.parse(rawMessage);
        if (errorJson?.error?.message) {
            rawMessage = errorJson.error.message;
        }
    } catch (e) {
        // Not a JSON string, continue with original message
    }

    // Check for timeout/deadline errors
    if (rawMessage.includes("Deadline expired") || rawMessage.includes("UNAVAILABLE")) {
        return `${context} - The AI service is currently busy. This usually resolves in a few moments. Please try again.`;
    }

    // Check for specific unsupported MIME type error from Gemini API
    if (rawMessage.includes("Unsupported MIME type")) {
        try {
            // It might be a JSON string like '{"error":{"message":"..."}}'
            const errorJson = JSON.parse(rawMessage);
            const nestedMessage = errorJson?.error?.message;
            if (nestedMessage && nestedMessage.includes("Unsupported MIME type")) {
                const mimeType = nestedMessage.split(': ')[1] || 'unsupported';
                return `File type '${mimeType}' is not supported. Please use a format like PNG, JPEG, or WEBP.`;
            }
        } catch (e) {
            // Not a JSON string, but contains the text. Fallthrough to generic message.
        }
        // Generic fallback for any "Unsupported MIME type" error
        return `Unsupported file format. Please upload an image format like PNG, JPEG, or WEBP.`;
    }

    // Check for rate limiting
    if (rawMessage.includes("429") || rawMessage.includes("rate limit") || rawMessage.includes("quota")) {
        return `${context} - Too many requests. Please wait a moment and try again.`;
    }

    // Check for safety filters
    if (rawMessage.includes("safety") || rawMessage.includes("blocked") || rawMessage.includes("SAFETY")) {
        return `${context} - Image was blocked by safety filters. Please try a different image.`;
    }

    return `${context}. ${rawMessage}`;
}