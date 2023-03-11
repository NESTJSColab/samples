import { Param, Controller, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';

import { DataFieldLockCommand } from './datafield-lock.command';

@ApiTags('DataField')
@Controller(`datafields`)
export class DataFieldLockController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Lock Datafield' })
  @Put('lock/:id')
  async update(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DataFieldLockCommand(id));
  }
}
