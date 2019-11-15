import { AngularFireAuth} from 'angularfire2/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any;
  uid: string;
  constructor(private auth:AngularFireAuth){}

  getCurrentUser(){
    return this.auth.auth;
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

}
