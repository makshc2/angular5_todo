import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/Task';

@Injectable()
export class JsonplaceholderService {

  configUrl = 'https://jsonplaceholder.typicode.com/todos/';

  constructor(
    public  http: HttpClient
  ) {
  }

  getTasks() {
    return this.http.get(this.configUrl);
  }

  addTask(task: Task) {
      return this.http.post(this.configUrl, {
        body: task
      });
  }

  // doneTask(completed: boolean) {
  //   return this.http.patch(this.configUrl, {
  //
  //   });
  // }

  deleteTask(id: number) {
    return this.http.delete(this.configUrl + id);
  }
}
