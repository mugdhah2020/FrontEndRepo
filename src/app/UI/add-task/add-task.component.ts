import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task-service';
import { ProjectService } from '../../service/project-service';
import { UserService } from '../../service/user-service';
import { Project } from '../../model/project';
import { Parent } from '../../model/parent';
import { User } from '../../model/user';
import { Task } from '../../model/task';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  public task: Task = new Task();
  public successMessage: string = '';
  public failureMessage: string = '';
  public enableParent: boolean = false;
  public display: string = 'none';
  public modalTitle: string;
  public modalMessage: string;
  public modalType: string;
  public parent: Parent = new Parent();
  public project: Project = new Project();
  public user: User = new User();
  public allParent: Parent[];
  public users: User[];
  public projects: Project[];
  public taskNameError: string;
  public projectNameError: string;
  public dateError: string;
  public userError: string;
  public searchItem: string;
  
  constructor(private taskService: TaskService,
    private userService: UserService,
    private projectService: ProjectService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.task = new Task();
    this.task.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.task.endDate = this.datePipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
  }

  validate() {
    let isValid: boolean = true;
    if (!this.task.taskName || this.task.taskName.trim() === "") {
      this.taskNameError = "Task Name is mandatory";
      this.failureMessage = "Mandatory fields are missing";
      isValid = false;
    }
    if (!this.task.project || !this.task.project.projectName || this.task.project.projectName === "") {
      this.projectNameError = "Project Name is mandatory";
      this.failureMessage = "Mandatory fields are missing";
      isValid = false;
    }
    if (!this.enableParent && (!this.task.startDate || !this.task.endDate || this.task.startDate > this.task.endDate)) {
      this.dateError = "Invalid Start and End date";
      this.failureMessage = "Mandatory fields are missing/Invalid";
      isValid = false;
    }
    if (!this.enableParent && (!this.task.user || !this.task.user.firstName)) {
      this.userError = "User name missing";
      this.failureMessage = "Mandatory fields are missing/Invalid";
      isValid = false;
    }
    return isValid;
  }

  save(event) {
    event.preventDefault();
    this.successMessage = this.taskNameError = this.dateError = this.projectNameError = this.userError = this.failureMessage = '';
    if (this.validate()) {
      if (this.task.parent && !this.task.parent.parentTask) {
        this.task.parent = null;
      }
      if (this.enableParent) {
        this.task.startDate = this.task.endDate = this.task.user = this.task.parent = null;
        this.taskService.addParentTask(this.task).subscribe(
          resp => this.successMessage = 'Parent Task added successfully!',
          error => this.failureMessage = 'Add Parent task failed. Try again later');
      }else{
        
        this.taskService.addTask(this.task).subscribe(
          resp => this.successMessage = 'Task added successfully!',
          error => this.failureMessage = 'Add task failed. Try again later');
      }
    }
    this.initialize();
  }

  togglePTask() {
    this.enableParent = !this.enableParent;
    this.successMessage = this.taskNameError = this.dateError = this.projectNameError = this.userError = this.failureMessage = '';
  }

  openUserModel() {
    this.userService.getUsers().subscribe(
      resp => this.users = resp
    );
    this.modalType = 'userModal';
    this.display = 'block';
    this.modalTitle = 'Manager Selection';
    this.modalMessage = 'Please select anyone of the employee below as Manager';
  }

  openParentModel() {
    this.taskService.getAllParent().subscribe((resp : Parent[])=>{
      this.allParent = resp;
    });
    this.modalType = 'parentModal';
    this.display = 'block';
    this.modalTitle = 'Parent Task Selection';
    this.modalMessage = 'Please select anyone of the task below as Parent Task';
  }

  openProjectModel() {
    
    this.projectService.getProjects().subscribe(
      resp => this.projects = resp
      
      
    );
    
    this.modalType = 'projectModal';
    this.display = 'block';
    this.modalTitle = 'Project Selection';
    this.modalMessage = 'Please select anyone of the project below';
  }

  closeModal() {
    this.display = 'none';
  }

  selectedUser(user: User, event: Event) {
    event.preventDefault();
    this.user = user;
  }

  selectedProject(project: Project, event: Event) {
    event.preventDefault();
    this.project = project;
  }

  selectedParent(parent: Parent, event: Event) {
    event.preventDefault();
    this.parent = parent;
  }

  add() {
    if (this.modalType === 'userModal') {
      this.task.user = this.user;
    }
    if (this.modalType === 'parentModal') {
      this.task.parent = this.parent;
    }
    if (this.modalType === 'projectModal') {
      this.task.project = this.project;
      
    }
    this.display = "none";
  }

}
