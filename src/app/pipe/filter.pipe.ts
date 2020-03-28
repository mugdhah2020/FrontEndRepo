import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task'

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tasks?: Task[], name?: string): Task[] {
    if (!tasks) {
      return [];
    }
    if (!name) {
      return tasks;
    }

    return tasks.filter(task => {
      
      if (name && task.project && task.project.projectName && task.project.projectName.toLowerCase().includes(name.toLowerCase())) {
        return true;
      }
      return false;
    });
  }
}
