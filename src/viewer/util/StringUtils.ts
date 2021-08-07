/**
 * ex. 100000 -> '100,000'
 */
export function numberToFormattedString(value: number) {
    return value.toLocaleString('en', { useGrouping: true });
}
