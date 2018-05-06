import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { JsonplaceholderService } from '../services/jsonplaceholder.service';
import { Task } from '../models/Task';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() task: Task;
  @Output() delete = new EventEmitter(); edit = new EventEmitter();
  constructor(
    public server: JsonplaceholderService
  ) { }

  ngOnInit() {
  }

  deleteTask() {
    this.delete.emit(this.task.id);
  }
}
