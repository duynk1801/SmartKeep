/**
 * Regex Utilities for Serial Number Extraction
 *
 * Common serial formats:
 * - Alphanumeric: ABC123XYZ456
 * - Dash-separated: SN-1234-5678-90AB
 * - Prefix-based: S/N: ABC123, Serial: XYZ789
 */

/**
 * Common serial number patterns found on device labels and warranty cards.
 */
const SERIAL_PATTERNS: RegExp[] = [
  // "S/N: ABC123" or "Serial: ABC123" or "SN: ABC123"
  /(?:S\/N|Serial(?:\s*(?:No|Number|#))?|SN)\s*[:.]?\s*([A-Z0-9][\w\-]{4,30})/i,

  // "Model: ABC-123-XYZ"
  /(?:Model)\s*[:.]?\s*([A-Z0-9][\w\-]{4,30})/i,

  // Standalone alphanumeric serial (8-20 chars, at least 1 letter + 1 digit)
  /\b([A-Z0-9]{2,4}[\-]?[A-Z0-9]{4,16})\b/,
];

/**
 * Extracts a serial number from raw text (e.g., from OCR output).
 *
 * @param text - Raw text to search
 * @returns First matching serial number or null
 */
export function extractSerialNumber(text: string): string | null {
  for (const pattern of SERIAL_PATTERNS) {
    const match = text.match(pattern);
    if (match?.[1]) {
      return match[1].trim();
    }
  }
  return null;
}

/**
 * Validates a MAC address format.
 * Accepts: AA:BB:CC:DD:EE:FF or AA-BB-CC-DD-EE-FF
 */
export function isValidMacAddress(value: string): boolean {
  return /^([0-9A-Fa-f]{2}[:\-]){5}([0-9A-Fa-f]{2})$/.test(value);
}

/**
 * Validates an IPv4 address format.
 */
export function isValidIPv4(value: string): boolean {
  return /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(value);
}
