import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE];
  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`This status ${value} is not valid`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
