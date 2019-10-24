import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { FirebaseAuth } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase,private auth: AngularFireAuth) { }

  user:any;
  getToDoList(uid) {
    this.user = this.auth.auth.currentUser;
    console.log(this.user);
    this.toDoList =  this.firebasedb.list(`title/${uid}/list`);
    return this.toDoList;
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
