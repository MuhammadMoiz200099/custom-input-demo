
const DEFAULT_PATTERN = "(https|http|ftp):\/\/|(\w+\.|www.|(\w+:))(\w+)|(\/|-|_|/+|%|&|/+%)(\w+)|\/?\w+|=\w+|(\/)|(\.\w+)";

export function PatternValidator(value: string, pattren: string) {
  const reg_pattern = pattren ? pattren : DEFAULT_PATTERN;
  const regex = new RegExp(reg_pattern);
  const result = regex.test(value);
  return {
    isValid: result,
    message: result ? "" : "Fill in a valid URL"
  }
}
