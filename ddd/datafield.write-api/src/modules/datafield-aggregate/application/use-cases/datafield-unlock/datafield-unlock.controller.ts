import { Param, Controller, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';

import { DataFieldUnlockCommand } from './datafield-unlock.command';

@ApiTags('DataField')
@Controller(`datafields`)
export class DataFieldUnlockController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Unlock Datafield' })
  @Put('unlock/:id')
  async update(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DataFieldUnlockCommand(id));
  }
}
