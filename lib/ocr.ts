// OCR upload logic
export interface OCRResult {
  text: string;
  confidence: number;
}

export async function uploadImageForOCR(file: File): Promise<OCRResult> {
  // OCR upload implementation
  return { text: '', confidence: 0 };
}

export async function processOCRResult(result: OCRResult): Promise<string> {
  // Process OCR result
  return result.text;
}