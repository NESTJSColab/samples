import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';

import { ClientRemoveDatapassFromTargetCommand } from './client-remove-datapass-target.command';

@ApiTags('Client')
@Controller('clients')
export class ClientRemoveDatapassFromTargetController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Remove a Datapass from a Target' })
  @Delete('/:clientId/targets/:targetId/removedatapass/:datapassId')
  async remove(
    @Param('clientId') clientId: string,
    @Param('targetId') targetId: string,
    @Param('datapassId') datapassId: string,
  ): Promise<void> {
    return this.commandBus.execute(
      new ClientRemoveDatapassFromTargetCommand(targetId, datapassId),
    );
  }
}
