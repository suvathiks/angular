import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  dataArray: Array<Message>;
  errorMsg: String;
  isErrorMessageClosed: boolean;
  enableCheckMsg: String;
  todosArray: Array<object> = [];

  constructor(private apiService: ApiService) {
    this.dataArray = [];
    this.errorMsg = '';
    this.isErrorMessageClosed = false;
    this.enableCheckMsg = '';


  }

  ngOnInit() {
    this.getTodos();
  }

  public getTodos() {
    this.apiService.getTodos().subscribe((data) => {
      this.dataArray = data.todos;
    });
  }

  addTodo(value){
    let body = {
      "title":value,
      "completed":false,
      "username":" Rajan",
      "createDate": Date.now()
    }
 
    this.apiService.addTodo(body).subscribe(
      data => {
        this.getTodos();
      },
      err => {
 
      }
    )
 
  }
    updateTodo(id, value, v)
    {
      let body = {
        "completed":true,
        "_id": id,
        "__v": v,
        "title":value,
        "username": "Rajan",
        "modifiedAt":Date.now(),
        createdAt:Date.now(),
      }
      this.apiService.updateTodo(body).subscribe(
        data => {
          this.getTodos();
        },
        err => {
 
        }
      )
      }
 
  addToDataArray(value) {
   if(value.length > 0) {
    let data = new Message(value, (this.dataArray.length + 1), false, false);
    this.dataArray.push(data);
 
    this.addTodo(value);
 
    this.errorMsg = '';
    this.enableCheckMsg = '';
   } else {
     this.errorMsg = "String should not be EMPTY";
     this.isErrorMessageClosed = true;
   }
 
  }
 
  removeMessage(todo, i) {
    this.apiService.deleteTodo(todo._id).subscribe( data => {
      if (data.success) {
        this.getTodos();
      }
    })
  }
 
  enableEdit(data) {
    if(data.isChecked == true) {
      data.isEdit = true;
      this.enableCheckMsg = '';
    }
  }
 
  updateData(id, value) {
    for(let i=0; i<this.dataArray.length; i++) {
      if(this.dataArray[i].id == id) {
        this.dataArray[i].title = value;
        this.dataArray[i].isEdit = false;
        this.dataArray[i].isChecked = false;
      }
    }
 
  }
 
  closeErrorMessage() {
    this.errorMsg = '';
    this.isErrorMessageClosed = false;
 
  }
 
 }
 
 export class Message {
  id: number;
  isEdit: boolean;
  isChecked: boolean;
  title : string;
 
  constructor(title,id, isEdit, isChecked){
      this.title = title;
      this.id = id;
      this.isEdit = isEdit;
      this.isChecked = isChecked;
  }
 }
