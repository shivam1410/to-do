
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input'; 
import {MatDialogModule} from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button'; 
import { MatMenuModule } from '@angular/material/menu'
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { TodoComponent } from './todo/todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    TodoComponent,
    EditTodoComponent,
    NavbarComponent,
    HomeComponent,
    ChangePasswordComponent
  ],
  imports: [
    FormsModule,
    HomeRoutingModule,
    CommonModule,
    MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatDialogModule,
    MatButtonModule, MatInputModule,MatMenuModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [EditTodoComponent,ChangePasswordComponent]
})
export class HomeModule { }
