export default interface SelectOption {
  value: string;
  label: string;
}

export function createSelectOptionsFromStringArray(
  strings: string[]
): SelectOption[] {
  return strings.map((stringOption) => ({
    value: stringOption.toLowerCase(),
    label: stringOption.charAt(0).toUpperCase() + stringOption.slice(1),
  }));
}
