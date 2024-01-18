/**
 * Debounces a function, ensuring that it is only called after a specified timeout period has elapsed
 * since the last invocation.
 *
 * @param func The function to debounce.
 * @param timeout The timeout period in milliseconds (default: 300).
 * @returns A debounced version of the function.
 */
export function debounce(func: (...args: any) => any, timeout = 300) {
  let timer: NodeJS.Timeout

  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), timeout)
  }
}
