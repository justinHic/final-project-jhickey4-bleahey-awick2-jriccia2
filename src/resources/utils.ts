/**
 * Checks if the item is a string
 * @param item
 * @returns
 */
export function isString(item: any): item is string {
  if (item === undefined) return false;
  if (Array.isArray(item)) return false;
  return true;
}
