import { Component, OnInit } from '@angular/core';
import { UsersService, User } from '@client/core-data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'client-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  form: FormGroup;
  user: User;
  users$: Observable<User[]>;


  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.getUsers();
    this.initForm();
  }

  select(user: User) {
    this.user = user;
    this.form.patchValue(this.user);
  }

  getUsers() {
    this.users$ = this.usersService.all();
  }

  save(user: User) {
    if(user.Id) {
      this.usersService.update(user).subscribe(() => this.mutationResponse());
      return;
    }
    this.usersService.create(user).subscribe(() => this.mutationResponse());
  }

  deleteUser(userId: number) {
    this.usersService.delete(userId).subscribe(() => this.mutationResponse());
  }

  reset() {
    this.form.reset();
  }

  private mutationResponse() {
    this.getUsers();
    this.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      Id: null,
      FirstName: ['', Validators.compose([Validators.required])],
      LastName: ['', Validators.compose([Validators.required])],
    });
  }
}
