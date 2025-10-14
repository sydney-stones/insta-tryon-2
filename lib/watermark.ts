/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * Add watermark to an image data URL
 * @param imageDataUrl - The base64 image data URL
 * @returns Promise<string> - The watermarked image as data URL
 */
export const addWatermark = async (imageDataUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Calculate watermark size and position (center of image)
      const fontSize = Math.max(18, Math.floor(img.width / 35)); // Larger, responsive font size
      const padding = Math.floor(fontSize * 1);

      // Set watermark style
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Measure text
      const watermarkText = 'made with @renderedfits';
      const textMetrics = ctx.measureText(watermarkText);
      const textWidth = textMetrics.width;
      const textHeight = fontSize * 1.3;

      // Position at center
      const x = img.width / 2;
      const y = img.height / 2;

      // Draw semi-transparent background for better readability (centered)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(
        x - textWidth / 2 - padding,
        y - textHeight / 2 - padding / 2,
        textWidth + padding * 2,
        textHeight + padding
      );

      // Draw white text (centered)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fillText(watermarkText, x, y);

      // Convert to data URL
      try {
        const watermarkedDataUrl = canvas.toDataURL('image/png', 0.95);
        resolve(watermarkedDataUrl);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for watermarking'));
    };

    img.src = imageDataUrl;
  });
};
