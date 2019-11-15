import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { MatDialog } from '@angular/material';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user:string;

  constructor(
        private authService:AuthService,
        private router:Router,
        private toDoService:TodoService,
        private dialog: MatDialog,
    ) {
        const uid = this.authService.getUid();
        console.log(uid);
        this.getDetails(uid);
     }

  ngOnInit() {}

  getDetails(uid){
    this.toDoService.getUserDetails(uid).once('value')
    .then(u=>{
      this.user = u.val().name;
      console.log(u.val())
    })
    .catch(e=>console.log(e))
  }

  logOut(){
    this.authService.logOut()
    .then(()=>{
      this.authService.removeUid();
      this.router.navigate(['../login']);
    })
    .catch(e=>console.log(e))
  }

  changePassword(){

      const dialogRef = this.dialog.open(ChangePasswordComponent, {
        width: '300px',
      });
  
      dialogRef.afterClosed().subscribe(res => {
        console.log('The change password dialog was closed');
      },()=>{
      });
    }
}
