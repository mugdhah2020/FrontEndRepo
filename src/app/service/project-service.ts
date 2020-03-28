import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../model/project';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
    

  private baseURI: String = "http://localhost:8096/project/";

  constructor(private http: HttpClient) { }

  getProjects(): any {
    console.log("Service call to - "+ this.baseURI);
    return this.http.get<Project[]>(this.baseURI + 'allProjects').pipe(map(x=>x));
  }

  deleteProject(projectId : number): any {
    console.log("Service Project Id - " + projectId);
        return this.http.delete(this.baseURI + 'suspend/'+projectId);
      }
  saveProject(project): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      })
    };
    return this.http.post(this.baseURI + 'add', project, httpOptions);
  }
}
