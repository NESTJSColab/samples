import { StatusEnumBase } from 'src/shared/entities';
import { BadRequestException, PipeTransform } from '@nestjs/common';

class StatusBaseValidationPipe implements PipeTransform {
  readonly allowedStatuses = [StatusEnumBase.ACTIVE, StatusEnumBase.INACTIVE];
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

export default StatusBaseValidationPipe;
