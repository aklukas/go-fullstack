import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

const URL = "http://localhost:8080/api/v1/users"

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  all(): Observable<User[]> {
    return this.http.get<User[]>(URL);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(URL, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(this.getUrlWithId(user.Id), user);
  }

  delete(userId: number): Observable<unknown> {
    return this.http.delete(this.getUrlWithId(userId));
  }

  findOne(userId: number): Observable<User> {
    return this.http.get<User>(this.getUrlWithId(userId));
  }

  private getUrlWithId(userId: number) {
    return `${URL}/${userId}`;
  }
}
