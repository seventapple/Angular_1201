import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit, OnChanges {
  @Input() list: any;
  //下拉框关闭flag
  @Input() optionCloseFlg: boolean;
  @Input() value: any;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  control = new FormControl();
  filteredCondition: Observable<any[]>;
  //选择栏高度
  optionHeight;
  //入力框的对象
  @ViewChild('ipt') iptEr: ElementRef;
  //MatAutoComplete 组件 关闭下拉框
  @ViewChild('ipt', {read: MatAutocompleteTrigger}) autoTrigger: MatAutocompleteTrigger;

  customPlaceholder: string = 'input ... ';

  emptyOpt = {value: '', name: ''};

  constructor(private changeDetectorRef:ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //监听到父级传值,关闭当前的下拉框
    if (changes['optionCloseFlg']?.currentValue) {
      this.closePanel();
    }
    //监听到父级传值,清空下拉框选值
    if (changes['value']?.currentValue === '') {
      this.control.setValue(this.emptyOpt);
    }
  }

  ngOnInit(): void {
    // 列表有默认值的情况
    const matchItem = this.list.find(cus => cus.value === this.value);
    let searchField;
    if(matchItem){
      searchField = matchItem.name;
    }else{
      searchField = '';
    }
    // 入力组件过滤器初始化
    this.filteredCondition = this.control.valueChanges.pipe(
      startWith(searchField),
      map(value => this._filter(value))
    );
    console.error(matchItem)
    if(matchItem){
      this.control.setValue(matchItem);
    }
  }

  //入力组件显示
  displayName(bean: any): string {
    return bean && bean.name ? bean.name : '';
  }

  //入力组件过滤方法
  _filter(value: string): any[] {
    const valueToLow = this._normalizeValue(value);
    const filterList =[];
    const len = this.list.length;
    for(let i =0;i<len;i++){
      if(this._normalizeValue(this.list[i]).includes(valueToLow)){
        filterList.push(this.list[i]);
      }
    }
    const cnt = filterList.length;
    if (cnt < 10) {
      this.optionHeight = cnt * 20;
    } else {
      this.optionHeight = 10 * 20;
    }
    /**
     * FIX:ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'undefinedpx'. Current value: '200px'.
     */
    this.changeDetectorRef.detectChanges();
    return filterList;
  }

  //入力参数转换方法
  _normalizeValue(value: any): string {
    // console.error('before:')
    // console.error(value)
    const valueTran = value.name !== undefined ? value.name : value;
    // console.error('after:')
    // console.error(valueTran)
    return valueTran.toLowerCase().replace(/ /g, '');
  }

  //入力框失去焦点触发事件
  inputBlur() {
    //不是由于选择下拉框失去焦点
    if (!this.autoTrigger.panelOpen) {
      this.inputCheck();
    }
  }

  //入力框有效性检查
  inputCheck() {
    if (this.control.value?.name !== undefined) {
      this.valueChange.emit(this.control.value.value);
    } else {
      const matchItem = this.list.find(entry => entry.name === this.control.value);
      if(matchItem){
        this.control.setValue(matchItem);
        this.valueChange.emit(matchItem.value);
      }else{
        this.control.setValue(this.emptyOpt);
        this.valueChange.emit('');
      }
    }
  }

  /**
   *1.显示下拉菜单选择内容 2.反应当前输入框的绝对位置
   */
  show() {
    console.error('input locale:');
    const iptLocale = this.iptEr.nativeElement.getBoundingClientRect();
    console.error('x:' + iptLocale.x);
    console.error('y:' + iptLocale.y);
    console.error(this.list)
  }

  /**
   * 主动关闭下拉框Autocomplete
   */
  closePanel() {
    this.autoTrigger.closePanel();
  }

  // 按键触发事件,delete清空入力栏
  delInput(event) {
    if (event.keyCode === 46) {
      this.control.setValue(this.emptyOpt);
      this.valueChange.emit('');
    }
  }
}
