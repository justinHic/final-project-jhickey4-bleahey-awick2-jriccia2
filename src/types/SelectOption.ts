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

export function createSelectOptionsFromNumberArray(
  numbers: number[]
): SelectOption[] {
  return numbers.map((numberOption) => ({
    value: numberOption.toString(),
    label: numberOption.toString(),
  }));
}
