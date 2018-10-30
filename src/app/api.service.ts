import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'https://isha-todos-api.herokuapp.com';
  constructor(private httpClient: HttpClient) { }
  getTodos() {
    return this.httpClient.get(`${this.API_URL}/todos/list`);
  }
  createContact(contact){
    return  this.httpClient.post(`${this.API_URL}/contacts/`,contact);
}
}
