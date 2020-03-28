import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/user';

@Pipe({
  name: 'userSearch'
})
export class UserSearchPipe implements PipeTransform {

  transform(users: User[], name?: string): any {
    if (!users) {
      return [];
    }
    if (!name || name.trim().length === 0) {
      return users;
    }
    return users.filter(user => {
      let fullName = '';
      if (user.firstName) {
        fullName = user.firstName;
      }
      if (user.lastName) {
        fullName = fullName.concat(" ").concat(user.lastName);
      }
      if (fullName && name && fullName.toLowerCase().includes(name.toLowerCase())) {
        return true;
      }
      return false;
    });
  }

}
