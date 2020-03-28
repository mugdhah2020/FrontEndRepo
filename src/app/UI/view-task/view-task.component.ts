import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../service/task-service';
import { ProjectService } from '../../service/project-service';
import { Project } from '../../model/project';
import { Parent } from '../../model/parent';
import { Task } from '../../model/task';
@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  public successMessage: string = '';
  public todayDate: any = new Date();
  public tasks: Task[] = [];
  public project: Project = new Project();
  public display: string = 'none';
  public searchItem: string;
  public projects: Project[];

  constructor(private datePipe: DatePipe,
    private projectService: ProjectService,
    private taskService: TaskService) { }

  ngOnInit() {
    this.todayDate = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
    this.getAllTasks();
    
  }

  endTask(task) {
    this.taskService.endTask(task.taskId).subscribe(
     // resp => this.tasks = resp;
      resp => this.successMessage = 'Parent Task added successfully!');
    this.getAllTasks();
  }

  getAllTasks() {
    
    this.taskService.getTasks().subscribe(
      resp => this.tasks = resp
     
    );
    

  }


  getAllProjects() {
    this.projectService.getProjects().subscribe(
      resp => this.projects = resp
    );
  }
  

  openProjectModel() {
    this.getAllProjects();
    this.display = 'block';
    this.searchItem = '';
  }

  closeModal() {
    this.display = 'none';
  }

  add() {
    this.searchItem = this.project.projectName;
    this.display = "none";
  }

  selectedProject(project: Project, event: Event) {
    event.preventDefault();
    this.project = project;
  }

  sortByPriority() {
    this.tasks = this.tasks.sort((a, b) => a.priority - b.priority);
    
  }

  sortByStartDate() {
    this.tasks = this.tasks.sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
    
  }

  sortByEndDate() {
    this.tasks = this.tasks.sort((a, b) => (a.endDate > b.endDate ? 1 : -1));
  }

  sortByStatus() {
    this.tasks = this.tasks.sort((a, b) => (a.status > b.status ? 1 : -1));
  }
}

