import { NgModule } from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuardService } from "./guards/auth-guard.service";

export const routes: Routes = [
    {path: '' , redirectTo: '/home', pathMatch: 'full' },
    {path: 'home', loadChildren: './home/home.module#HomeModule',canActivate: [AuthGuardService]},
    {path: 'login', component: LoginComponent,pathMatch: 'full' },
    {path: 'create', component: RegisterComponent,pathMatch: 'full' },


]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule] 
})
export class AppRoutingModule{
    constructor(){}
}