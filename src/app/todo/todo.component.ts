import { TodoService } from './shared/todo.service';
import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  date: NgbDate;
  constructor(private toDoService: TodoService) { }

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
    console.log(d.value)
    console.log(this.date);
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

}
