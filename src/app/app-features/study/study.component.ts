import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as saveAs from 'src/assets/FileSaver';
import {rejects} from 'assert';
import {getFileExtension, getFileName} from '../../app.basic-util';
import * as JSZip from 'jszip';
import {promises} from 'dns';
import {I18nService} from '../../services/i18n.service';
import {DialogService} from '../../modules/dialog/dialog.service';
import {DateService} from '../../services/date.service';
import * as moment from 'moment';

declare function require(x: string): any;

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {

  //下载区域对象
  @ViewChild('downBody') downBody: ElementRef;

  //input整数与小数入力
  intTest: number;
  //tooltip
  tooltipMsg: any = 'any set can show.';

  //下载文件用文件
  fileType: string;
  files: any[] = [];
  downloadName: string = '';
  extensionInfo: string = '';

  //时间转换
  timeInput: string;
  timeFormat: string = 'wait input';
  timeUtc: string;

  //隐藏组件flg
  hiddenFlg: boolean = true;

  constructor(private i18n: I18nService,
              private dialogService: DialogService,
              private dateService: DateService) {
  }

  ngOnInit(): void {
    //radio默认值
    this.fileType = '3';
    //下载列表初始化
    this.files.push({
      fileName: '',
      file: null,
      cnt: 0
    });
    //链式调用
    this.testPromise2();
    //多语言测试
    console.log('========i18n========');
    console.log(this.i18n.get('COMMON.LABEL.LANGUAGE_EN'));
  }

  //Promise构造函数练习
  testPromise1(): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log('run method1 in class.');
      resolve('test1 resolve');
      resolve('test1 reject');
    });
  }

  testPromise2() {
    this.testPromise1().then(resolve => {
      console.log(resolve);
      console.log('run method2 in class.');
    });
  }


  //数字输入显示
  showInt() {
    console.log(this.intTest);
    const int = Number.parseInt(this.intTest.toString(), 10);
    console.log('转科学计数法：' + int.toExponential());
    console.log('转字符串：' + int.toPrecision());
    console.log('转字符串：' + int.toLocaleString());
    console.log('转字符串：' + int.toFixed());
  }

  //下载列表添加行
  addRow() {
    this.files.push({
      fileName: '',
      file: null,
      cnt: 0
    });
    //set download name info
    this.getFileNameAndExtension();
    //焦点随着点击向下
    setTimeout(() => {
      this.downBody.nativeElement.scrollTop = this.downBody.nativeElement.scrollHeight;
    });
  }

  //下载列表删除行
  delRow(i) {
    this.files.splice(i, 1);
    //set download name info
    this.getFileNameAndExtension();
  }

  //选择文件
  changeFile(e, i) {
    const fileList: FileList = e.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      console.log(file);
      this.files[i].file = file;
      this.files[i].fileName = file.name;
      //set download name info
      this.getFileNameAndExtension();
    }
  }

  //获取后缀信息
  getFileNameAndExtension() {
    const matchFile = this.files.find(bean => bean.fileName);
    if (matchFile) {
      if (this.fileType === '2') {
        this.downloadName = getFileName(matchFile.fileName);
        this.extensionInfo = '.zip';
      } else {
        this.downloadName = getFileName(matchFile.fileName);
        this.extensionInfo = getFileExtension(matchFile.fileName);
      }
    }
  }

  doDownload() {
    console.log('ready to download');
    //file未制定check set file 重名check
    const fileNameMap = new Map<string, number>();
    this.files.find(bean => bean.fileName);
    for (let fileEntry of this.files) {
      const name = fileEntry.fileName;
      if (name) {
        const match = fileNameMap.get(name);
        if (match === undefined) {
          fileNameMap.set(name, 0);
        } else {
          fileEntry.cnt = match + 1;
          fileNameMap.set(name, match + 1);
        }
      } else {
        this.dialogService.error('Error', 'No file.', '');
        return;
      }
    }
    //文件下载
    if (this.fileType === '3') {
      this.download(this.files[0].file);
    } else {
      //压缩后下载
      this.zipFile().then(resolve => {
        console.log(resolve);
        this.download(resolve);
      });
    }
  }

  //文件压缩
  zipFile(): Promise<any> {
    const JSZip = require('jszip');
    const zip = new JSZip();
    let fileCnt = this.files.length;
    return new Promise((resolve) => {
      this.files.forEach((file, index) => {
        const filereader = new FileReader();
        filereader.readAsArrayBuffer(file.file);
        filereader.onload = () => {
          const name = this.fileRename(file.fileName, file.cnt);
          zip.file(name, filereader.result);
          if (index + 1 === fileCnt) {
            zip.generateAsync({type: 'blob'}).then(
              content => {
                console.log('success zip file.');
                resolve(content);
                // 压缩文件直接保存
                // saveAs(content, name);
              }
            );
          }
        };
      });
    });
  }

  //重名文件重命名
  fileRename(name, cnt) {
    if (cnt) {
      return getFileName(name) + '(' + cnt + ')' + getFileExtension(name);
    } else {
      return name;
    }
  }

  fileZip(): Promise<any> {
    const JSZip = require('jszip');
    const zip = new JSZip();
    return new Promise((resolve) => {
      const filereader = new FileReader();
      const file = this.files[0];
      filereader.readAsArrayBuffer(file.file);
      filereader.onload = function() {
        zip.file(file.fileName, this.result);
        resolve(zip);
      };
    });
  }

  //文件下载
  download(file) {
    let name = this.downloadName + this.extensionInfo;
    const blob = new Blob([file], {type: 'applicatin/txt'});
    if (window.navigator.msSaveOrOpenBlob) {
      //Internet Explorer 10
      console.log('ie download');
      window.navigator.msSaveOrOpenBlob(blob, encodeURIComponent(name));
    } else {
      console.log('other download');
      const customTag = document.createElement('a');
      document.body.appendChild(customTag);
      const fileURL = URL.createObjectURL(blob);
      customTag.href = fileURL;
      if (this.downloadName) {
        customTag.download = name;
      } else {
        customTag.download = this.files[0].fileName;
      }
      customTag.click();
    }
  }

  //时间格式转化 by moment
  formatDate() {
    this.dialogService.confirm('Confirm', 'do you agree？', '').subscribe(res => {
      if (res) {
        const value = this.timeInput;
        let format = 'yyyyMMddHHmmss';

        format = format.replace('yyyy', 'YYYY');
        format = format.replace('dd', 'DD');
        format = format.replace('d', 'D');

        const moment = require('moment-timezone');
        const momentDate = moment(value).tz(moment.tz.guess());

        momentDate.local('zh-CN');

        if (!momentDate.isValid()) {
          this.timeFormat = value;
        }
        this.timeFormat = momentDate.format(format);
      }
    });
  }

  //转换时间成毫秒
  getMillSecond(date: any): number {
    return this.dateService.convertDateTime(date, false);
  }

  //毫秒转化成UTC
  getUtc(date, format: string = 'YYYYMMDDHHmmss') {
    return moment(date).utc().format(format);
  }

  //时间转化成UTC时间
  timeChange() {
    const time = this.timeFormat;
    let date = new Date(
      parseInt(
        time.substr(0, 4)),
      parseInt(time.substr(4, 2)) - 1,
      parseInt(time.substr(6, 2)),
      parseInt(time.substr(8, 2)),
      parseInt(time.substr(10, 2)),
      parseInt(time.substr(12, 2)));
    this.timeUtc = date.getUTCFullYear().toString() + (date.getUTCMonth() + 1).toString()
      + date.getUTCDate().toString() + date.getUTCHours().toString()
      + date.getUTCMinutes().toString() + date.getUTCSeconds().toString();
  }

  dateFormat(fmt, date) {
    let ret;
    const opt = {
      'y+': date.getUTCFullYear().toString(),
      'M+': (date.getUTCMonth() + 1).toString(),
      'd+': date.getUTCDate().toString(),
      'h+': date.getUTCHours().toString(),
      'm+': date.getUTCMinutes().toString(),
      's+': date.getUTCSeconds().toString()
    };
    for (let k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')));
      }
    }
    return fmt;
  }

  //隐藏组件
  hidden() {
    this.hiddenFlg = !this.hiddenFlg;
  }

  //删除屏幕显示组件
  removeDiv() {
    console.log('remove div');
    document.getElementById('div_1').style.display = 'none';
  }
}


