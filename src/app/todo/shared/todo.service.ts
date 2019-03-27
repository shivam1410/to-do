import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList() {
    this.toDoList = this.firebasedb.list('title');
    return this.toDoList;
  }

  addTitle(title: string,date: any) {
    this.toDoList.push({
      title: title,
      date: date,
      isChecked: false
    });
  }

  editTitle($key:string ,title: string,date:any) {
    this.toDoList.update($key,{title: title,
    date: date});
  }
  checkOrUncheckTitle($key: string, flag: boolean) {
    this.toDoList.update($key, { isChecked: flag});
  }

  removeTitle($key: string) {
    this.toDoList.remove($key);
  }

}
