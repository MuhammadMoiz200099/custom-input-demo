import { Validator, ValidatorEntry, defaultValidator, combineValidators } from './validator'
import { ValidatorsName } from '../enums/valdations.enum';
import { patternValidator } from './pattern/pattern.validator';



export function getValidator<A>(list: Array<string | ValidatorEntry | Validator<A>>): Validator<A> {
    return (list || []).map(v => {
        if (typeof v === 'string') {
            return validator(v, null);
        } else if ( v && (v as any).name) {
            v = v as ValidatorEntry;
            return validator(v.name, v.options);
        } else {
            return v as Validator<A>;
        }
    }).reduce(combineValidators, defaultValidator);
}

export function validator(name: string, options: any): Validator<any> {
    options = options || {};
    switch (name) {
        case (ValidatorsName.pattern):
            return patternValidator(options.pattern);
        default:
            return defaultValidator;
    }
}