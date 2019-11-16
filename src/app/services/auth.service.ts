import { AngularFireAuth} from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth){
    this.auth.auth.onAuthStateChanged(u=>{
      if(u){
        this.saveUid(u.uid);
      }
    })
  }
  
  registernNewUser(data){
    return this.auth.auth.createUserWithEmailAndPassword(data.email,data.password)
  }

  login(data){
    return this.auth.auth.signInWithEmailAndPassword(data.email,data.password)
  }

  logOut(){
    return this.auth.auth.signOut();
  }
  isAuthenticated(){
    if(this.getUid()){
      return true;
    }
  }

  changePassword(currentPassword){
    const u = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(u.email,currentPassword);
    return u.reauthenticateAndRetrieveDataWithCredential(credential);
  }

  getUid = () => {return window.localStorage.getItem('uid')};
  
  saveUid = (uid: string) => {return window.localStorage.setItem('uid',uid)};
  
  removeUid = () => {return window.localStorage.removeItem('uid')};
}
