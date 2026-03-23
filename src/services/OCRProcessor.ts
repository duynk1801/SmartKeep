import { extractSerialNumber } from '@/src/utils/regex';

/**
 * OCRProcessor — Text extraction from warranty images.
 *
 * Currently a placeholder; will integrate with:
 * - expo-camera for photo capture
 * - A native Expo Module or cloud OCR API (Google Vision / Tesseract)
 *
 * The interface is designed so the implementation can be swapped
 * from JS → Native without changing consumers.
 */

interface OCRResult {
  rawText: string;
  serialNumber: string | null;
  purchaseDate: string | null;
  confidence: number;
}

export const OCRProcessor = {
  /**
   * Processes an image URI and extracts text.
   *
   * @param imageUri - Local file URI from camera or image picker
   * @returns Extracted OCR data with parsed serial number
   */
  async processImage(imageUri: string): Promise<OCRResult> {
    // TODO: Integrate with native OCR engine (MLKit / Tesseract via Expo Module)
    console.log(`[OCR] Processing image: ${imageUri}`);

    // Placeholder — in production, this would call the native OCR engine
    const rawText = '';

    return {
      rawText,
      serialNumber: extractSerialNumber(rawText),
      purchaseDate: null,
      confidence: 0,
    };
  },

  /**
   * Extracts serial number from already-captured text.
   */
  extractSerial(text: string): string | null {
    return extractSerialNumber(text);
  },
} as const;
