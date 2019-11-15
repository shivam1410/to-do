import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private _formbuilder:FormBuilder,
    private router: Router,
    private authService: AuthService,
    private todoService:TodoService,
    ) {
    this.registerForm = this._formbuilder.group({
      name:[],
      email:[],
      password:[],
      confirmPassword:[]
    })
   }

  ngOnInit() {
  }

  register(data){
    console.log(data)
    this.authService.registernNewUser(data)
    .then(u=>{
      const uid=u.user.uid;
      this.todoService.addUserDetails(uid,{name:data.name})
      this.router.navigate(['/home'])
    })
    .catch(e=>console.log("error4"));
  }


  login(){
    console.log("navifate to login");
  }
}
