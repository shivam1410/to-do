import { AngularFireAuth} from 'angularfire2/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private auth:AngularFireAuth){}

  registernNewUser(data){
    return this.auth.auth.createUserWithEmailAndPassword(data.email,data.password)
  }

  login(data){
    return this.auth.auth.signInWithEmailAndPassword(data.email,data.password)
  }

  logOut(){
    return this.auth.auth.signOut();
  }
  
}
