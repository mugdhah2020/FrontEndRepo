import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../model/project';
@Pipe({
  name: 'filterProject'
})
export class ProjectPipe implements PipeTransform {

  transform(projects: Project[], name?: string): any {
    if (!projects) {
      return [];
    }
    if (!name || name.trim() === "") {
      return projects;
    }
    return projects.filter(project => {
      if (name && project.projectName && project.projectName.toLowerCase().includes(name.toLowerCase())) {
        return true;
      }
    }
    );
  }

}
