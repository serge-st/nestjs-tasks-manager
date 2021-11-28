import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException(`The task with ID "${id}" was not found.`);
    }

    return found;
  }

  async deleteTaskById(id: string): Promise<void> {
    await this.delete(id);
  }
}
