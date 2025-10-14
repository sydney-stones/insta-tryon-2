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

      // Calculate watermark size and position
      const fontSize = Math.max(14, Math.floor(img.width / 50)); // Responsive font size
      const padding = Math.floor(fontSize * 0.8);

      // Set watermark style
      ctx.font = `${fontSize}px Arial, sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';

      // Measure text
      const watermarkText = 'made with @renderedfits';
      const textMetrics = ctx.measureText(watermarkText);
      const textWidth = textMetrics.width;
      const textHeight = fontSize * 1.2; // Approximate height

      // Position at bottom left
      const x = padding;
      const y = img.height - padding;

      // Draw semi-transparent background for better readability
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(
        x - padding / 2,
        y - textHeight - padding / 2,
        textWidth + padding,
        textHeight + padding
      );

      // Draw white text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
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
