/**
 * Conditionally merges classNames in an array by calling the `cx` function.
 *
 * @param classNames - An array of class names to be merged.
 * @returns A string representing the merged class names.
 *
 * @example
 * const mergedClasses = cx('class', isActive && 'modifier');
 * // Result: 'class modifier' (if isActive is true)
 * // Result: 'class' (if isActive is false)
 */
export const cx = (
  ...classNames: (string | boolean | null | undefined)[]
): string | undefined =>
  classNames.filter((s) => typeof s === 'string').join(' ') || undefined
