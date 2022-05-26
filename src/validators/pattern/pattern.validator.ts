import { Validator } from '../validator';

const DEFAULT_PATTERN = "(https|http|ftp):\/\/|(\w+\.|www.|(\w+:))(\w+)|(\/|-|_|/+|%|&|/+%)(\w+)|\/?\w+|=\w+|(\/)|(\.\w+)";

export function patternValidator(pattern: string): Validator<string> {
    return {
        validate: (value: string) => {
          const reg_pattern = pattern ? pattern : DEFAULT_PATTERN;
          const regex = new RegExp(reg_pattern);
          return regex.test(value);
        },
        errorMessage: 'Fill in a valid URL'
    };
}