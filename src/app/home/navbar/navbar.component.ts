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
        if(this.authService.isAuthenticated()){
          this.getDetails(uid);
        }
     }

  ngOnInit() {}

  getDetails(uid){
    this.toDoService.getUserDetails(uid).once('value')
    .then(u=>{
      this.user = u.val().name;
    })
    .catch(e=>console.log("error1"))
  }

  logOut(){
    this.authService.removeUid();
    this.authService.logOut()
    .then(()=>{
      this.router.navigate(['../login']);
    })
    .catch(e=>console.log("error2"))
  }

  changePassword(){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('The change password dialog was closed');
    });
  }
}
