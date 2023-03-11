import { Param, Controller, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';

import { DataFieldDeleteCommand } from './datafield-delete.command';

@ApiTags('DataField')
@Controller(`datafields`)
export class DataFieldDeleteController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Delete Datafield' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DataFieldDeleteCommand(id));
  }
}
