import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../model/task';
@Pipe({
  name: 'filterparent'
})
export class ParentPipe implements PipeTransform {

  transform(parents: Task[], name?: string): Task[] {
    if (!parents) {
      return [];
    }
    if (!name) {
      return parents;
    }
    return parents.filter(parent => {
      if (parent && parent.taskName && parent.taskName.toLowerCase().includes(name.toLowerCase())) {
        return true;
      }
      return false;
    });

  }
}
