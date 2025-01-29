import { roundDouble } from "@/utils/roundDouble";

/**
 * Rounds or truncates a number and formats it for display.
 *
 * @param value - The number to process.
 * @param decimals - The number of decimal places to display.
 * @returns The formatted number as a string.
 */
export function formatNumber(value: number, decimals: number = 2): string {
  if (isNaN(value)) {
    throw new Error("Invalid number");
  }

  // Round the number using the specified decimals
  const roundedValue = roundDouble(value, decimals);

  // Format the number using Intl.NumberFormat
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(roundedValue);
}
