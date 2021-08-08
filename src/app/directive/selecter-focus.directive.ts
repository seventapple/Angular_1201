import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appSelecterFocus]'
})
export class SelecterFocusDirective {

  possibleColors=['darksalmon','hotpink', 'lightskyblue', 'goldenrod', 'peachpuff',
    'mediumspringgreen', 'cornflowerblue', 'blanchedalmond', 'lightslategrey'];

  constructor() { }

  @HostBinding('style.color') color:string;
  @HostBinding('style.borderColor') borderColor:string;
  //按键监听
  @HostListener('window:keydown',['$event'])
  testListen(event:KeyboardEvent){
    if(event.ctrlKey && event.key === 'Enter'){
      console.error('按Ctrl + Enter键');
    }
    if(event.key === 'Enter'){
      console.error('按Enter键');
    }
    const colorPick = Math.floor(Math.random()*this.possibleColors.length);
    this.color = this.borderColor = this.possibleColors[colorPick];
  }

  @HostListener('mousewheel',['$event'])
  testMouse(event:MouseEvent){
    console.error(event)
    console.error('mouse down')
  }
}
