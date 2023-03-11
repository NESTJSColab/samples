import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';

import { ValidatorDeleteCommand } from './validator-delete.command';

@ApiTags('Validator')
@Controller(`validators`)
export class ValidatorDeleteController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Delete a Validator' })
  @Delete(':id')
  async create(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new ValidatorDeleteCommand(id));
  }
}
