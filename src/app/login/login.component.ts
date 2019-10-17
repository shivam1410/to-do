import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor(private _formbuilder:FormBuilder,
    private router:Router,
    private authService:AuthService) { 
    this.loginForm = this._formbuilder.group({
      email:[],
      password:[]
    })
  }

  ngOnInit() {
  }

  login(data) {
     console.log("signed in");
     this.authService.login(data)
     .then(u=>{
      this.router.navigate(['/home'], {queryParams:{u:u.user.uid}})
     })
     .catch(e=>console.log(e));
  }

  signup(){
    console.log("nevigate to sign up");
  }

  signOut() {
    console.log("singned out");
  }
}
