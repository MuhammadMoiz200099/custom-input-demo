import { r as registerInstance, e as createEvent, h } from './index-ca4c0394.js';

const DEFAULT_PATTERN = "(https|http|ftp):\/\/|(\w+\.|www.|(\w+:))(\w+)|(\/|-|_|/+|%|&|/+%)(\w+)|\/?\w+|=\w+|(\/)|(\.\w+)";
function PatternValidator(value, pattren) {
  const reg_pattern = pattren ? pattren : DEFAULT_PATTERN;
  const regex = new RegExp(reg_pattern);
  const result = regex.test(value);
  return {
    isValid: result,
    message: result ? "" : "Fill in a valid URL"
  };
}

const customInputCss = ":host{display:block}.custom-input-container{display:flex;flex-direction:column;justify-content:flex-start;gap:10px}.custom-input-label{font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size:24px}.custom-input{padding:15px;outline:none;font-size:16px;width:500px}.custom-input-success{border:1px solid green;background:#edf6ed}.custom-input-error{border:1px solid #9b2727;background:#f6e6e6}.error_message{color:#9b2727;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size:12px;font-weight:bold}";

const CustomInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.onUserInput = createEvent(this, "onUserInput", 7);
  }
  handleEventChanged(event) {
    const validator = PatternValidator(event.target.value, this.validationPattern);
    this.isValid = validator.isValid;
    this.validation_message = validator.message;
    this.value = event.target.value;
    this.onUserInput.emit(event);
  }
  render() {
    return (h("div", null, h("div", { class: "custom-input-container" }, this.label && (h("label", { class: "custom-input-label" }, this.label)), h("input", { class: `custom-input ${this.value ? this.isValid ? "custom-input-success" : "custom-input-error" : ""}`, type: this.type, onInput: (event) => this.handleEventChanged(event), size: this.size }), this.value && this.validation_message && (h("span", { class: "error_message" }, this.validation_message)))));
  }
};
CustomInput.style = customInputCss;

export { CustomInput as custom_input };
