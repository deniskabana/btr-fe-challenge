/**
 * Conditionally merges classNames in an array by calling the `cx` function.
 * 
 * @param classNames - An array of class names to be merged.
 * @returns A string representing the merged class names.
 * 
 * @example
 * // Example 2: Merging class names conditionally
 * const isActive = true;
 * const mergedClasses = cx('class1', isActive && 'class2');
 * // Result: 'class1 class2' (if isActive is true)
 * // Result: 'class1 class3' (if isActive is false)
 */
export const cx = (...classNames: (string | boolean | null | undefined)[]) => classNames.filter(s => typeof s === "string").join(' ');