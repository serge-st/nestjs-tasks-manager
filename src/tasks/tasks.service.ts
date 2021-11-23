import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskById(id: string): void {
    const taskToDelete = this.tasks.find((task) => task.id === id);

    this.tasks.splice(this.tasks.indexOf(taskToDelete), 1);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    this.tasks[taskIndex].status = status;

    return this.tasks[taskIndex];
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, desciption } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      desciption,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
