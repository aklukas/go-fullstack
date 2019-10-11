import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@client/core-data';

@Component({
  selector: 'client-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @Input() users;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectUser(user: User) {
    this.selected.emit(user);
  }

  deleteUser(userId: number) {
    this.deleted.emit(userId);
  }
}
