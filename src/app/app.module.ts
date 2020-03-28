import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './UI/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { UserSearchPipe } from './pipe/user-search.pipe';
import { ProjectComponent } from './UI/project/project.component';
import { ProjectPipe } from './pipe/project.pipe';
import { DatePipe } from '@angular/common';
import { ViewTaskComponent } from './UI/view-task/view-task.component';
import { EditTaskComponent } from './UI/edit-task/edit-task.component';
import { AddTaskComponent } from './UI/add-task/add-task.component';
import { ParentPipe } from './pipe/parent.pipe';
import { FilterPipe } from './pipe/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserSearchPipe,
    ProjectComponent,
    ProjectPipe,
    ViewTaskComponent,
    EditTaskComponent,
    AddTaskComponent,
    ParentPipe,
    FilterPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
