/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Vertex AI Virtual Try-On Service
 * Integration with Google's Vertex AI Virtual Try-On API
 */

const VERTEX_TRYON_API_URL = 'http://localhost:5002';

/**
 * Convert a File to base64 string
 */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Convert URL to base64 string
 */
async function urlToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], 'image', { type: blob.type });
  return fileToBase64(file);
}

/**
 * Convert base64 string to data URL
 */
function base64ToDataURL(base64: string): string {
  return `data:image/png;base64,${base64}`;
}

/**
 * Check if Vertex AI Try-On server is running
 */
export async function checkVertexTryonHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${VERTEX_TRYON_API_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.error('Vertex AI Try-On health check failed:', error);
    return false;
  }
}

/**
 * Generate virtual try-on using Vertex AI
 *
 * @param personImage - File object or URL of the person's image
 * @param garmentImage - File object or URL of the garment image
 * @returns Data URL of the generated try-on image
 */
export async function generateVertexTryOn(
  personImage: File | string,
  garmentImage: File | string
): Promise<string> {
  try {
    // Convert images to base64
    let personBase64: string;
    let garmentBase64: string;

    if (typeof personImage === 'string') {
      // If it's a URL, fetch and convert
      if (personImage.startsWith('http')) {
        personBase64 = await urlToBase64(personImage);
      } else if (personImage.includes('base64,')) {
        personBase64 = personImage.split('base64,')[1];
      } else {
        personBase64 = personImage;
      }
    } else {
      personBase64 = await fileToBase64(personImage);
    }

    if (typeof garmentImage === 'string') {
      if (garmentImage.startsWith('http')) {
        garmentBase64 = await urlToBase64(garmentImage);
      } else if (garmentImage.includes('base64,')) {
        garmentBase64 = garmentImage.split('base64,')[1];
      } else {
        garmentBase64 = garmentImage;
      }
    } else {
      garmentBase64 = await fileToBase64(garmentImage);
    }

    // Call Vertex AI Try-On API
    const response = await fetch(`${VERTEX_TRYON_API_URL}/tryon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        person_image: personBase64,
        garment_image: garmentBase64,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Vertex AI Try-On API request failed');
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Vertex AI Try-On processing failed');
    }

    console.log(`✅ Generated try-on image (${data.bytes_used} bytes)`);

    // Convert base64 result to data URL
    return base64ToDataURL(data.result_image);
  } catch (error) {
    console.error('Error generating Vertex AI try-on:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Failed to generate virtual try-on with Vertex AI'
    );
  }
}

/**
 * Get error message for Vertex AI Try-On issues
 */
export function getVertexTryonErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('Failed to fetch')) {
      return 'Vertex AI Try-On server is not running. Please start it with: cd vertex-tryon && python vertex_tryon_server.py';
    }
    if (error.message.includes('GOOGLE_CLOUD_PROJECT')) {
      return 'Google Cloud project not configured. Set GOOGLE_CLOUD_PROJECT environment variable.';
    }
    if (error.message.includes('authentication') || error.message.includes('credentials')) {
      return 'Authentication error. Run: gcloud auth application-default login';
    }
    return error.message;
  }
  return 'An unexpected error occurred with Vertex AI Try-On';
}
