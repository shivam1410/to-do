import { AngularFireAuth} from 'angularfire2/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any;
  isauth:boolean;
  constructor(public afAuth: AngularFireAuth, private auth:AngularFireAuth){}

  getCurrentUser(){
    this.user = this.auth.auth.currentUser;
    if(this.user){
      console.log(this.user)
    }
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
      console.log(u);
      return u!==null;
    })
  }

}
