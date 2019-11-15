import { AngularFireAuth} from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth,private firebase:FirebaseApp){
    console.log(this.auth.auth.currentUser)
    this.auth.auth.onAuthStateChanged(u=>{
      this.saveUid(u.uid);
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
    return this.auth.auth.onAuthStateChanged(u=> {
      return u!==null;
    })
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
