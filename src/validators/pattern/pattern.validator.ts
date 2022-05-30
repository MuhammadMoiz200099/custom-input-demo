import { Validator } from '../validator';

const DEFAULT_PATTERN = /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-F\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/;

export function patternValidator(pattern: string): Validator<string> {
    return {
        validate: (value: string) => {
          if(pattern) {
            const regex = new RegExp(pattern);
            return regex.test(value);
          } else {
            return DEFAULT_PATTERN.test(value);
          }
        },
        errorMessage: 'Fill in a valid URL'
    };
}