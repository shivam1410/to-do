import { Component, OnInit, NgZone } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user:any;
  constructor(private auth: AuthService,private activatedRoute:ActivatedRoute,private router:Router,private ngZone:NgZone) {
    this.auth.getCurrentUser().onAuthStateChanged(u=>{
      if(u.uid){
        this.ngZone.run(()=>this.router.navigate([],{queryParams:{u: u.uid}}));
      }
    })
   }

  ngOnInit() {
   
  }

}
