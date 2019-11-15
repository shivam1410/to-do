import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user:string;

  constructor(private authService:AuthService
    ,private router:Router,
    private toDoService:TodoService,private routes:ActivatedRoute
    ) { 
    console.log(this.user)

    }

  ngOnInit() {

    let uid = this.routes.snapshot.queryParams['u'];
    if(uid){
      this.getDetails(uid)
    }
    else {
      this.authService.getCurrentUser().onAuthStateChanged(u=>{
        if(u.uid){
          this.getDetails(u.uid)
        }
      })
    }
   
  }

  getDetails(uid){
    this.toDoService.getUserDetails(uid).once('value')
    .then(u=>{
      this.user = u.val().name;
      console.log(this.user)
    })
    .catch(e=>console.log(e))
  }
  logOut(){
    this.authService.logOut()
    .then(()=>{
      this.router.navigate(['../login']);
    })
    .catch(e=>console.log(e))
  }
}
