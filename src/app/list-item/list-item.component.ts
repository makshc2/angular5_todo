import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { JsonplaceholderService } from '../services/jsonplaceholder.service';
import { Task } from '../models/Task';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  isEdit: boolean;
  @Input() task: Task;
  @Output() delete = new EventEmitter();
  @Output() done = new EventEmitter();
  @Output() edit = new EventEmitter();

  constructor(
    public server: JsonplaceholderService
  ) { }

  ngOnInit() {
    this.server.canceledTask.subscribe( data => {
      if (data === this.isEdit) {
        this.isEdit = !this.isEdit;
      }
    });
    this.server.checkEditingTask.subscribe(data => {
      this.isEdit = data;
    });
  }

  doneTask() {
    this.done.emit({id: this.task.id, completed: this.task.completed});
  }

  deleteTask() {
    this.delete.emit(this.task.id);
  }

  editTask() {
    this.server.emitCheckEditingTask(false);
    this.isEdit = true;
    const updateTask = Object.assign({}, this.task);
    this.edit.emit(updateTask);
  }

}
