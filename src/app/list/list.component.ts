import { Component, OnInit } from '@angular/core';
import { JsonplaceholderService } from '../services/jsonplaceholder.service';
import { Task } from '../models/Task';

@Component ({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  tasks: Task[];

  constructor(
      public server: JsonplaceholderService
  ) { }

  ngOnInit() {
    this.server.getTasks().subscribe(data => {
      if (data) {
        this.tasks = data;
     }
   }, error => {
          console.log(error);
   });
  }

  deleteTask(id) {
    this.server.deleteTask(id).subscribe(data => {
        this.tasks = this.tasks.filter( task => task.id !== id);
    });
  }

  doneTask(id, completed) {
    this.server.doneTask(id, completed).subscribe( data => {
      console.log(data);
    });
  }

  identify(index) {
    return index;
  }
}
