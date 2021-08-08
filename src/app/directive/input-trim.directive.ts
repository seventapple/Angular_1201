import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { DefaultValueAccessor } from '@angular/forms';

@Directive({
  selector: 'input [trim]'
})
export class InputTrimDirective extends DefaultValueAccessor {

  @Input() trim: string;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('blur', ['$event.type', '$event.target.value'])
  onBlur(event: string, value: string): void {
    this.trimValue(event, value);
  }

  private trimValue(event: string, value: string): void {
    if (this.trim !== '' && event !== this.trim) {
      return;
    }
    value = value.trim();

    this.ngModelChange.emit(value);
    this.writeValue(value);
  }
}
