import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { DefaultValueAccessor } from '@angular/forms';

@Directive({
  selector: 'input[num]'
})
export class InputNumDirective extends DefaultValueAccessor {

  @Input() num: string;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('blur', ['$event.type', '$event.target.value', '$event.target.min', '$event.target.max'])
  onBlur(event: string, value: string, min: string, max: string): void {
    this.numFormatValue(event, value, min, max );
  }

  private numFormatValue(event: string, value: string, min: string, max: string): void {
    if (this.num !== '' && event !== this.num) {
      return;
    }
    value = this.rangeNum(value,min,max);

    this.ngModelChange.emit(value);
    this.writeValue(value);
  }

  private rangeNum =(value: string, min: string, max: string):string =>{
    const valueNum = Number(value);
    if(min || min === '0'){
      if(valueNum < Number(min)){
        return min;
      }
    }
    if(max || max === '0'){
      if(valueNum > Number(max)){
        return max;
      }
    }
    return value;
  };
}
