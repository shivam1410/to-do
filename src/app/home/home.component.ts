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
  constructor() {}

  ngOnInit() {
   
  }

}
