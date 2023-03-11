import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';

import { ClientDatapassDeleteCommand } from './client-datapass-delete.command';

@ApiTags('Client')
@Controller('clients')
export class ClientDatapassDeleteController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Delete a Datapass' })
  @Delete('/:clientId/datapasses/:id')
  async create(
    @Param('clientId') clientId: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.commandBus.execute(
      new ClientDatapassDeleteCommand(clientId, id),
    );
  }
}
