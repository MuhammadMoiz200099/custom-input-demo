import { Component, Prop, h, Event, EventEmitter, State, Method } from '@stencil/core';
import { handleValidationObject } from '../../utills/validator.utils';
import { Validator, getValidator, defaultValidator } from '../../validators';

@Component({
  tag: 'custom-input',
  styleUrl: 'custom-input.css',
  shadow: true,
})
export class CustomInput {
  /**
  * Define the type of Input Field e.g "url"
  */
  @Prop() label: string;
  /**
   * Define the type of Input Field e.g "url"
   */
  @Prop() type: string;

  /**
   * Handle the validatity constrain of input field
   */
  @Prop({
    mutable: true
  }) isValid: boolean;

  /**
   * Define the size of input
   */
  @Prop() size: number;

  /**
   * Define the pattern to validate the input field
   */
  @Prop() validationPattern: string;

  /**
   * This is the event for on user input
   */
  @Event() onUserInput: EventEmitter<any>;

  /**
   * Component Variable to store input's user typed value 
   */
  @State() value: string;

  /**
   * Validator Instance
   */
  _validator: Validator<string> = defaultValidator;

  componentWillLoad() {
    this._validator = getValidator<string>(handleValidationObject({ pattern: this.validationPattern }));
  }

  componentWillUpdate() {
    this._validator = getValidator<string>(handleValidationObject({ pattern: this.validationPattern }));
  }


  handleEventChanged(event): void {
    this.value = event.target.value;
    this.onUserInput.emit(event);
    this.validate();
  }

  @Method()
  validate(): void {
    this.isValid = this._validator.validate(this.value);
    console.log(this._validator.errorMessage, this.isValid)
  }

  render() {
    return (
      <div>
        <div class="custom-input-container">
          {this.label && (
            <label class="custom-input-label">{this.label}</label>
          )}
          <input class={`custom-input ${this.value ? this.isValid ? "custom-input-success" : "custom-input-error" : ""}`}
            type={this.type}
            onInput={(event) => this.handleEventChanged(event)}
            size={this.size}
          />
          {!this.isValid ?
            <span class="error_message">{this._validator.errorMessage}</span>
            : null}
        </div>
      </div>
    );
  }
}
