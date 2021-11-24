import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    // define a temporaty array to hold the result
    let tasks = this.getAllTasks();

    // do something with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // do something with search
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.desciption.includes(search)) {
          return true;
        }

        return false;
      });
    }

    // return final result
    return tasks;
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
