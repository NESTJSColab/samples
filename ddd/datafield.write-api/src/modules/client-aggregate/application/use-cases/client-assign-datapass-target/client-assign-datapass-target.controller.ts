import { Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';

import { ClientAssingDatapassToTargetCommand } from './client-assign-datapass-target.command';

@ApiTags('Client')
@Controller('clients')
export class ClientAssignDatapassToTargetController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Assign Datapass to Target' })
  @Post('/:clientId/targets/:targetId/assigndatapass')
  async create(
    @Param('clientId') clientId: string,
    @Param('targetId') targetId: string,
    @Param('datapassId') datapassId: string,
  ): Promise<void> {
    return this.commandBus.execute(
      new ClientAssingDatapassToTargetCommand(clientId, targetId, datapassId),
    );
  }
}
