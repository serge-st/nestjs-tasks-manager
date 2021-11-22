import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, desciption: string): Task {
    const task: Task = {
      id: '',
      title,
      desciption,
      status: TaskStatus.OPEN,
    };

    return task;
  }
}
