import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor( private toast: NgToastService) { 
  }
  showToast(msg:string, Resp:any){
    console.log(Resp)
        msg === "success" ?  this.toast.success({ detail: "SUCCESS", summary: Resp, position: 'topCenter' }) :
        this.toast.error({ detail: 'error', summary: Resp, duration: 2000, position: "topCenter" })
  }
}
