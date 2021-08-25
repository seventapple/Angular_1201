import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  showWaiting(){
    if(this.document.getElementById('over')){
      this.document.getElementById('over').style.display = 'block';
      this.document.getElementById('circle').style.margin = '300px auto';
    }
  }

  hideWaiting(){
    if(this.document.getElementById('over')){
      this.document.getElementById('over').style.display = 'none';
    }
  }
}
