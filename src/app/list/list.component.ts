import { Component, OnInit } from '@angular/core';
import { JsonplaceholderService } from '../services/jsonplaceholder.service';
import { Task } from '../models/Task';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component ({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  tasks: Task[];

  constructor(
      public server: JsonplaceholderService,
      public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.server.getTasks().subscribe(data => {
      if (data) {
        this.tasks = data;
     }
   }, error => {
          console.log(error);
   });

    this.server.newTask.subscribe((data: Task) => {
      if (data['body']) {
        const newTask = Object.assign({}, data['body'], {id: data.id});
        this.tasks.unshift(newTask);
        this.server.updateCount(this.tasks.length);
      }
    });

    this.server.updatingTask.subscribe((task: Task) => {
      if (task['body']) {
        this.tasks = this.tasks.map(item => {
          if (item.id === task.id) {
            item.title = task['body'].title;
          }
          return item;
        });
      }
    });
  }

  deleteTask(id) {
    this.server.deleteTask(id).subscribe(data => {
        this.tasks = this.tasks.filter( task => task.id !== id);
        this.server.updateCount(this.tasks.length);
        this.flashMessage.show('delete success', {
          cssClass: 'alert-warning',
          showCloseBtn: true,
          closeOnClick: true,
          timeOut: 3000
        });
    }, error => {
      this.flashMessage.show(error.message, {
        cssClass: 'alert-danger',
        showCloseBtn: true,
        closeOnClick: true,
        timeOut: 3000
      });
    });
  }

  doneTask({id, completed}) {
    this.server.doneTask(id, completed).subscribe( data => {
      return this.tasks;
    });
  }

  editTask(task: Task) {
    this.server.emitEditTask(task);
  }

  identify(index) {
    return index;
  }
}
