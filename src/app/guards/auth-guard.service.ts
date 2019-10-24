import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authservice: AuthService, private router:Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean>| boolean {
    if(this.authservice.isAuthenticated())
    return true;

    this.router.navigate(['/login']);
    return false;
  }
}
