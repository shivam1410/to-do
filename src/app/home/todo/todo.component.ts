import { TodoService } from '../../services/todo.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from '@angular/material';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { $ } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  date: NgbDate;
  edTitle: string;
  edDate: NgbDate;
  hover: false;
  user:any;
  
  constructor(
    private toDoService: TodoService,
    private dialog: MatDialog,
    private auth:AuthService
    ) {
      const uid=this.auth.getUid();
      if(this.auth.isAuthenticated()){
        this.setTodoList(uid);
      }
    }

  ngOnInit() {}

  setTodoList(uid){
    this.toDoService.getToDoList(uid).snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.toDoListArray.push(x);
        console.log(x);
      });
      this.toDoListArray.sort((a, b) => {
        return a.isChecked - b.isChecked ;
      });
    },e=>{
      console.log("logged out or unauthorized access")
    });
  }

  onAdd(itemTitle,d) {
    this.toDoService.addTitle(itemTitle.value,this.date);
    itemTitle.value = null;
    this.date = null;
  }

  switchCheck($key, isChecked) {
    this.toDoService.checkOrUncheckTitle($key, !isChecked);
  }

  onDelete($key) {
    this.toDoService.removeTitle($key);
  }

  editTitle($key,title,date): void {

    this.edTitle=title;
    this.edDate = date;
    const dialogRef = this.dialog.open(EditTodoComponent, {
      width: '300px',
      data: {title: this.edTitle, date: this.edDate}
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed');
      if(res) {
        console.log(res)
        this.toDoService.editTitle($key,res.title,res.date);
      }
    },
    ()=>{
    });
  }

}