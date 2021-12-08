import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, HostListener, Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild, ViewContainerRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../../../modules/dialog/dialog.service';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit, OnChanges {
  title = 'Mat-autocomplete Test'
  @Input() list: any;
  //下拉框关闭flag
  @Input() optionCloseFlg: boolean;
  //传入默认值
  @Input() value: any;
  //返回的选定值
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  control = new FormControl();
  filteredCondition: Observable<any[]>;
  //选择栏高度
  optionHeight;
  //入力框的对象
  @ViewChild('ipt') iptEr: ElementRef;
  //MatAutoComplete 组件 关闭下拉框
  @ViewChild('ipt', {read: MatAutocompleteTrigger}) autoTrigger: MatAutocompleteTrigger;
  //入力栏对象
  @ViewChild('ipt', {read: ViewContainerRef}) public input;
  //选择栏对象
  @ViewChild('autocomplete', {read: ViewContainerRef}) public autocomplete;
  //虚拟加载对象
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;
  //空白无选中值
  emptyOpt = {value: '', name: ''};
  //入力框执行检查Flag
  executeBlurFlg = true;

  /**
   * 构造器
   * @param changeDetectorRef 避免画面加载后值变化,引起的报错
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private dialogData:any,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogService: DialogService) {
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
    console.error('ngOnInit')
    console.error(this.dialogData)
    if(this.dialogData){
      if(this.dialogData.defValue){
        this.value = this.dialogData.defValue;
      }
      if(this.dialogData.list){
        this.list = this.dialogData.list;
      }
    }
    // 列表有默认值的情况
    const matchItem = this.list.find(cus => cus.value === this.value);
    let searchField;
    if (matchItem) {
      searchField = matchItem.name;
    } else {
      searchField = '';
    }
    // 入力组件过滤器初始化
    this.filteredCondition = this.control.valueChanges.pipe(
      startWith(searchField),
      map(value => this._filter(value))
    );
    // console.error(matchItem)
    if (matchItem) {
      this.control.setValue(matchItem);
    }
  }

  doSave(){
    this.dialogService.close(InputSelectComponent,this.control.value);
  }
  clean(){
    this.control.setValue(this.emptyOpt);
    this.valueChange.emit('');
  }

  // 针对cdk缓存加载的问题,及时刷新选择栏
  optionRefresh() {
    this.virtualScroll.ngOnInit();
  }

  //入力组件显示
  displayName(bean: any): string {
    return bean && bean.name ? bean.name : '';
  }

  //入力组件过滤方法
  _filter(value: string): any[] {
    this.executeBlurFlg = true;
    const valueToLow = this._normalizeValue(value);
    const filterList = [];
    const len = this.list.length;
    for (let i = 0; i < len; i++) {
      if (this._normalizeValue(this.list[i]).includes(valueToLow)) {
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

  //入力参数转换方法(最小化去空格包含,即认为符合条件)
  _normalizeValue(value: any): string {
    const valueTran = value.name !== undefined ? value.name : value;
    return valueTran.toLowerCase().replace(/ /g, '');
  }

  //监听全画面,除去入力框和选择栏,点击事件触发入力框检查
  @HostListener('document:click', ['$event'])
  click(event) {
    if (this.executeBlurFlg && this.autocomplete && !this.autocomplete.element.nativeElement.contains(event.target) && !this.input.element.nativeElement.contains(event.target)) {
      this.inputCheck();
    }
  }

  //入力框失去焦点触发事件
  inputCheck() {
    console.error('inputCheck()')
    if (this.control.value?.name === undefined) {
      const matchItem = this.list.find(entry => entry.name === this.control.value);
      if (matchItem) {
        this.control.setValue(matchItem);
        this.valueChange.emit(matchItem.value);
      } else {
        this.control.setValue(this.emptyOpt);
        this.valueChange.emit('');
      }
    }
    this.executeBlurFlg = false;
  }

  //入力框有效性检查
  selectOptCheck() {
    console.error('selectOptCheck()');
    this.valueChange.emit(this.control.value.value);
  }

  /**
   *1.显示当前输入框的绝对位置
   */
  show() {
    console.error('input locale:');
    const iptLocale = this.iptEr.nativeElement.getBoundingClientRect();
    console.error('x:' + iptLocale.x);
    console.error('y:' + iptLocale.y);
  }

  /**
   * 主动关闭下拉框Autocomplete
   */
  closePanel() {
    console.error('closePanel()')
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
