import { TodoService } from './shared/todo.service';
import { Component, OnInit, Inject } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from '@angular/material';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  date: NgbDate;
  title: string;
  constructor(private toDoService: TodoService ,private dialog: MatDialog) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges()
    .subscribe(item => {
      this.toDoListArray = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.toDoListArray.push(x);
      });

      this.toDoListArray.sort((a, b) => {
        return a.isChecked - b.isChecked ;
      });
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

  editTitle($key,title): void {
    // this.dialog.open(EditTodoComponent);
    console.log($key);
    this.title=title;
    const dialogRef = this.dialog.open(EditTodoComponent, {
      width: '250px',
      data: {title: this.title, date: this.date}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.toDoService.editTitle($key,result.title,result.date);
    });
  }

}