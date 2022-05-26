import { r as registerInstance, e as createEvent, h } from './index-6faf4cde.js';

/*
 *
 *  Creates a validation config for multiple validators
 *
 *  thier are three ways to put a config for requried validation
 *  [  "pattern",                                                   for this you to pass like { pattern: "" }
 *    { name: "pattern", options: { pattern: "/{(/\)}/g" } },       for this you to pass like { pattern: "/{(/\)}/g" }
 *    { name: "pattern", options: { min: 1, max: 2  } }             for this you to pass like { pattern: { min: 1, max: 2 } }
 *  ]
 *
 *  for multiple validations pass in the config
 *  e.g
 *   [Parameter] config = {
 *                  pattern: "/{(/\)}/g",
 *                  length: { min: 3, max: 255 },
 *                  isNotEmpty: "",
 *                  .....
 *              }
 *
*/
function handleValidationObject(config) {
  if (!Object.keys(config).length) {
    return [];
  }
  let validators = [];
  for (let v in config) {
    let obj = {};
    if (!config[v]) {
      validators.push(v);
    }
    else {
      obj.name = v;
      if (typeof config[v] !== 'object') {
        obj.options = {
          [v]: config[v]
        };
      }
      else {
        obj.options = config[v];
      }
      validators.push(obj);
    }
  }
  return validators;
}

const defaultValidator = {
  validate: (_x) => true
};
function combineValidators(v1, v2) {
  let combined;
  combined = {
    validate: (x) => {
      const res1 = v1.validate(x);
      const res2 = v2.validate(x);
      if (!res1) {
        combined.errorMessage = v1.errorMessage;
      }
      else if (!res2) {
        combined.errorMessage = v2.errorMessage;
      }
      return res1 && res2;
    },
  };
  return combined;
}

var ValidatorsName;
(function (ValidatorsName) {
  ValidatorsName["pattern"] = "pattern";
  ValidatorsName["length"] = "length";
})(ValidatorsName || (ValidatorsName = {}));

const DEFAULT_PATTERN = "(https|http|ftp):\/\/|(\w+\.|www.|(\w+:))(\w+)|(\/|-|_|/+|%|&|/+%)(\w+)|\/?\w+|=\w+|(\/)|(\.\w+)";
function patternValidator(pattern) {
  return {
    validate: (value) => {
      const reg_pattern = pattern ? pattern : DEFAULT_PATTERN;
      const regex = new RegExp(reg_pattern);
      return regex.test(value);
    },
    errorMessage: 'Fill in a valid URL'
  };
}

function getValidator(list) {
  return (list || []).map(v => {
    if (typeof v === 'string') {
      return validator(v, null);
    }
    else if (v && v.name) {
      v = v;
      return validator(v.name, v.options);
    }
    else {
      return v;
    }
  }).reduce(combineValidators, defaultValidator);
}
function validator(name, options) {
  options = options || {};
  switch (name) {
    case (ValidatorsName.pattern):
      return patternValidator(options.pattern);
    default:
      return defaultValidator;
  }
}

const customInputCss = ":host{display:block}.custom-input-container{display:flex;flex-direction:column;justify-content:flex-start;gap:10px}.custom-input-label{font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size:24px}.custom-input{padding:15px;outline:none;font-size:16px;width:500px}.custom-input-success{border:1px solid green;background:#edf6ed}.custom-input-error{border:1px solid #9b2727;background:#f6e6e6}.error_message{color:#9b2727;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size:12px;font-weight:bold}";

const CustomInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.onUserInput = createEvent(this, "onUserInput", 7);
    /**
     * Validator Instance
     */
    this._validator = defaultValidator;
  }
  componentWillLoad() {
    this._validator = getValidator(handleValidationObject({ pattern: this.validationPattern }));
  }
  componentWillUpdate() {
    this._validator = getValidator(handleValidationObject({ pattern: this.validationPattern }));
  }
  handleEventChanged(event) {
    this.value = event.target.value;
    this.onUserInput.emit(event);
    this.validate();
  }
  validate() {
    this.isValid = this._validator.validate(this.value);
    console.log(this._validator.errorMessage, this.isValid);
  }
  render() {
    return (h("div", null, h("div", { class: "custom-input-container" }, this.label && (h("label", { class: "custom-input-label" }, this.label)), h("input", { class: `custom-input ${this.value ? this.isValid ? "custom-input-success" : "custom-input-error" : ""}`, type: this.type, onInput: (event) => this.handleEventChanged(event), size: this.size }), !this.isValid ?
      h("span", { class: "error_message" }, this._validator.errorMessage)
      : null)));
  }
};
CustomInput.style = customInputCss;

export { CustomInput as custom_input };
