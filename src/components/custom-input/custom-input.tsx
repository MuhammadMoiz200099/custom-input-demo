import { Component, Prop, h, Event, EventEmitter, State } from '@stencil/core';
import { PatternValidator } from '../../validators/validator';

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
   * Component Variable to save the validation message 
   */
  @State() validation_message: string;

  /**
   * Component Variable to store input's user typed value 
   */
   @State() value: string;


  handleEventChanged(event) {
    const validator = PatternValidator(event.target.value, this.validationPattern);
    this.isValid = validator.isValid;
    this.validation_message = validator.message;
    this.value = event.target.value;
    this.onUserInput.emit(event);
  }

  render() {
    return (
      <div>
        <div class="custom-input-container">
          {this.label && (
            <label class="custom-input-label">{this.label}</label>
          )}
          <input class={`custom-input ${this.value ? this.isValid ? "custom-input-success" : "custom-input-error"  : ""}`}
            type={this.type}
            onInput={(event) => this.handleEventChanged(event)}
            size={this.size}
          />
          {this.value && this.validation_message && (
            <span class="error_message">{this.validation_message}</span>
          )}
        </div>
      </div>
    );
  }
}
