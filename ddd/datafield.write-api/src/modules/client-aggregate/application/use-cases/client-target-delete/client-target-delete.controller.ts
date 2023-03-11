import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';

import { ClientTargetDeleteCommand } from './client-target-delete.command';

@ApiTags('Client')
@Controller('clients')
export class ClientTargetDeleteController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Delete a Target' })
  @Delete('/:clientId/targets/:id')
  async create(
    @Param('clientId') clientId: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.commandBus.execute(new ClientTargetDeleteCommand(clientId, id));
  }
}
