import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList(uid) {
    return this.firebasedb.list(`title/${uid}/list`);
    
  }

  getUserDetails(uid){
    return this.firebasedb.database.ref(`title/${uid}/about`);
  }

  addUserDetails(uid,data){
    const details = this.firebasedb.database.ref(`title/${uid}/about`);
    details.set(data);
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
