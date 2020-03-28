import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { Project } from '../../model/project';
import { DatePipe } from '@angular/common';
import { ProjectService } from '../../service/project-service';
import { UserService } from '../../service/user-service';
@Component({
  selector: 'app-project',
  templateUrl: 'project.component.html',
  styleUrls: ['project.component.css']
})
export class ProjectComponent implements OnInit {

  public project: Project = new Project();
  public successMessage: string = '';
  public failureMessage: string = '';
  public enableDate: boolean = false;
  public dateType: any = "text";
  public nameError: string = "";
  public managerError: string = "";
  public dateError: string = "";
  public saveType: string = 'Add';
  public display: string = 'none';
  public user: User = new User();
  public users: User[] = [];
  public projects: Project[] = [];
  public searchItem: string;
  public pname:string;
  public userName:string;
  
  constructor(private datePipe: DatePipe,
    private userService: UserService,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.project.priority = 0;
    this.getAllProjects();
  }

  getAllProjects() {
    
    this.projectService.getProjects().subscribe(
      resp => this.projects = resp
      
    );
    
  }

  save(event) {
    
    this.nameError = this.dateError = this.managerError = this.failureMessage = this.successMessage = '';
    event.preventDefault();
    if (this.validate()) {
      this.saveService(this.project);
    }
  }
  saveService(project: Project) {
    this.projectService.saveProject(project).subscribe(
      resp => {
        this.successMessage = 'Project added successfully!';
        this.getAllProjects();
      },
      error => this.failureMessage = 'Add Project failed. Try again later');
  }
  reset() {
    this.project = new Project();
    this.user = new User();
    this.saveType = "Add";
    this.project.priority = 0;
    this.enableDate = false;
    this.dateType = "text";
    this.nameError = this.dateError = this.managerError = this.failureMessage = this.successMessage = '';
  }

  toggleDate() {
    this.enableDate = !this.enableDate;
    if (this.enableDate) {
      this.project.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.project.endDate = this.datePipe.transform(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
      this.dateType = "date";
    } else {
      this.project.startDate = '';
      this.project.endDate = '';
      this.dateType = "text";
    }
  }

  validate() {
    let isValid: boolean = true;
    if (!this.project.projectName || this.project.projectName.trim() === "") {
      this.nameError = "Project Name is mandatory";
      this.failureMessage = "Mandatory fields are missing";
      isValid = false;
    }
    if (!this.project.user.firstName || this.project.user.firstName.trim() === "") {
      this.managerError = "Manager Name is mandatory";
      this.failureMessage = "Mandatory fields are missing";
      isValid = false;
    }
    if (this.enableDate && (this.project.startDate > this.project.endDate)) {
      this.dateError = "Invalid Start and End date";
      this.failureMessage = "Mandatory fields are missing/Invalid";
      isValid = false;
    }
    return isValid;
  }

  update(project: Project) {
    this.nameError = this.dateError = this.managerError = this.failureMessage = this.successMessage = '';
    this.saveType = "Update";
    if (project.startDate && project.endDate) {
      this.enableDate = true;
      this.dateType = "date"
    }
    this.project = project;
  }

  suspend(project: Project) {
    project.endDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.projectService.deleteProject(project.projectId).subscribe(
      resp => {
        this.successMessage = 'Project added successfully!';
        this.getAllProjects();
      },
      error => this.failureMessage = 'Add Project failed. Try again later');
   
  }

  openUserModel() {
    this.display = 'block';
    this.userService.getUsers().subscribe(
      resp => this.users = resp
    );
  }

  closeUserModal() {
    this.display = 'none';
  }

  selectedUser(user: User, event: Event) {
    event.preventDefault();
    this.user = user;
  }

  addUser() {
    this.project.user = this.user;
    this.display = "none";
    
  }

  sortByPriority() {
    this.projects = this.projects.sort((a, b) => (a.priority > b.priority ? 1 : -1));
    
  }

  sortByStartDate() {
    this.projects = this.projects.sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
    
  }

  sortByEndDate() {
    this.projects = this.projects.sort((a, b) => (a.endDate > b.endDate ? 1 : -1));
    
  }

  sortByStatus() {
    this.projects = this.projects.sort((a, b) => (a.status > b.status ? 1 : -1));
    
  }

}
