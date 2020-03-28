import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../service/task-service';
import { Task } from '../../model/task';
import { Parent } from '../../model/parent';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  private todayDate: any = new Date();
  public taskId: any;
  public viewOnly: boolean = false;
  public task: Task = new Task();
  public successMessage: string = '';
  public failureMessage: string = '';
  public display: string = 'none';
  public parent: Parent = new Parent();
  public tasks: Task[];
  public allParent: Parent[];
  public taskNameError: string;
  public dateError: string;
  public userError: string;
  public enableParent: boolean = false;
  public searchItem: string;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private datePipe: DatePipe) {

  }

  ngOnInit() {
    this.todayDate = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
    this.taskId = this.route.snapshot.paramMap.get('taskId');
    
    this.taskService.getTaskById(this.taskId).subscribe(resp => {
      this.task = resp;
      
      
      if (this.task.taskName) {
        this.viewOnly = (this.task.endDate <= this.todayDate);
      }
      if (!this.task.startDate) {
        this.enableParent = true;
      }
      if (!this.task.parent) {
        this.task.parent = new Parent();
      }
      
    });
  }

  updateTask(event) {
    this.successMessage = this.taskNameError = this.dateError = this.userError = this.failureMessage = '';
    event.preventDefault();
    if (this.task.parent && (!this.task.parent.parentTask || this.task.parent.parentTask.trim() === "")) {
      this.task.parent = null;
    }
    if (this.validate()) {
      this.taskService.updateTask(this.task).subscribe(
        resp => this.successMessage = 'Task updated successfully!',
        error => this.failureMessage = 'Update failed. Try again later');
    }
    // this.router.navigate(['/view']);
  }

  validate() {
    let isValid: boolean = true;
    if (!this.task.taskName || this.task.taskName.trim() === "") {
      this.taskNameError = "Task Name is mandatory";
      this.failureMessage = "Mandatory fields are missing";
      isValid = false;
    }
    if (!this.enableParent && (!this.task.startDate || !this.task.endDate || this.task.startDate > this.task.endDate)) {
      this.dateError = "Invalid Start and End date";
      this.failureMessage = "Mandatory fields are missing/Invalid";
      isValid = false;
    }
    return isValid;
  }

  openParentModel() {
    this.taskService.getAllParent().subscribe(
      resp => this.allParent = resp
    );
    this.display = 'block';
  }

  closeModal() {
    this.display = 'none';
  }

  selectedParent(parent: Parent, event: Event) {
    event.preventDefault();
    this.parent = parent;
  }

  add() {
    this.task.parent = this.parent;
    this.display = "none";
  }

}
