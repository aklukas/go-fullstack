import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { User } from '@client/core-data';

@Component({
  selector: 'client-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent {
  selectedUser: User;
  @Input() group: FormGroup;
  @Input() set user(value: User) {
    this.selectedUser = Object.assign({}, value);
  }
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  saveUser(user: User, directive: NgForm) {
    this.saved.emit(user);
    directive.resetForm();
  }

  cancel() {
    this.group.reset();
  }

  determineIfUpdate() {
    return this.group ? !!this.group.value.Id : this.group;
  }
}
