/**
 * Rounds a number dynamically based on the decimals parameter.
 *
 * @param value - The number to process.
 * @param decimals - The number of decimal places to keep:
 *                   - If 0, rounds to the nearest integer.
 *                   - If 2 (or any positive integer), rounds to that many decimal places.
 * @returns The processed number.
 */
export function roundDouble(value: number, decimals: number = 2): number {
  if (isNaN(value)) {
    throw new Error("Invalid number");
  }

  const factor = Math.pow(10, decimals);

  // Use rounding logic
  return Math.round(value * factor) / factor;
}
