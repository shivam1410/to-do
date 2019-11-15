import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  currentPassword:string;
  newPassword:string;
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string, date: any}, private auth:AuthService) {
    }

    ngOnInit() { 
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(){
    const u = firebase.auth().currentUser;
    this.auth.changePassword(this.currentPassword).then(()=>{
      return u.updatePassword(this.newPassword).then(()=>{
        this.dialogRef.close();
      })
    }).catch(()=>console.log("error"))
  }
}
