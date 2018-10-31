import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'https://isha-todos-api.herokuapp.com';
  constructor(private httpClient: HttpClient) { }
  getTodos(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/todos/list`);
  }
  addTodo(body): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient.post(`${this.API_URL}/todos/add-todo`, body, { headers: headers });
  }
  updateTodo(body): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient.post(`${this.API_URL}/todos/edit-todo`, body, { headers: headers });
  }


  deleteTodo(id): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/todos/delete-todo/` + id);
  }
}
