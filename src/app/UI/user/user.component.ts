import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user-service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public user: User = new User();
  public saveType: string = 'Add';
  public successMessage: string = '';
  public failureMessage: string = '';
  public fnameError: string = '';
  public lnameError: string = '';
  public empIdError: string = '';
  public users: User[] = [];
  public empName:string;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.getAllUsers();
  }
  
  getAllUsers() {
    this.userService.getUsers().subscribe(
      resp => this.users = resp
    );
  }
  save(event) {
    
    this.fnameError = this.lnameError = this.empIdError = this.failureMessage = this.successMessage = '';
    event.preventDefault();
    if (this.validate()) {
      this.saveService(this.user);
    }
  }
  saveService(user: User) {
    this.userService.saveUser(this.user).subscribe(
      resp => {
        this.getAllUsers();
        this.successMessage = 'User added successfully!';
        
      },
      error => this.failureMessage = 'Add User failed. Try again later');
  }

  validate() {
    let isValid: boolean = true;
    if (!this.user.firstName || this.user.firstName.trim() === "") {
      this.fnameError = "First Name is mandatory";
      this.failureMessage = "Mandatory fields are missing";
      isValid = false;
    }
    if (!this.user.lastName || this.user.lastName.trim() === "") {
      this.lnameError = "Last Name is mandatory";
      this.failureMessage = "Mandatory fields are missing";
      isValid = false;
    }
    if (!this.user.employeeId || this.user.employeeId.trim() === "") {
      this.empIdError = "Employee Id is mandatory";
      this.failureMessage = "Mandatory fields are missing";
      isValid = false;
    }
    return isValid;
  }

  reset() {
    this.user = new User();
    this.saveType = "Add";
    this.fnameError = this.lnameError = this.empIdError = this.failureMessage = this.successMessage = '';
  }
  edit(user: User) {
    this.fnameError = this.lnameError = this.empIdError = this.failureMessage = this.successMessage = '';
    this.saveType = "Update";
    this.user = user;
    
    //this.userService.editUser(this.user).subscribe(
     // resp => {
      //  this.getAllUsers();
      //  this.successMessage = 'User Edited Successfully!';
        
    //  },
     // error => this.failureMessage = 'Edit User failed. Try again later');
  }

  delete(user: User):void {
   
    this.fnameError = this.lnameError = this.empIdError = this.failureMessage = this.successMessage = '';
   
    this.userService.deleteUser(user.userId).subscribe(
      resp => {
        this.getAllUsers();
        this.successMessage = 'User Deleted Successfully !';
      },
      error => this.failureMessage = 'Delete User Failed. Try Again Later');
    
    this.successMessage = "User Deleted";
  }


  sortByFirstName() {
    this.users = this.users.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
  }

  sortByLastName() {
    this.users = this.users.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1);
  }

  sortByEmpId() {
    
    this.users = this.users.sort((a, b) => (Number(a.employeeId) > Number(b.employeeId)) ? 1 : -1);
    
  }
  
}
