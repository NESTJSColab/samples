import { Body, Controller, Post, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';

import { ClientDatapassAddDto } from '../../dto/client-datapass-add.dto';
import { ClientDatapassAddCommand } from './client-datapass-add.command';

@ApiTags('Client')
@Controller('clients')
export class ClientDatapassAddController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Add a new Datapass' })
  @Post('/:clientId/datapasses')
  async create(
    @Param('clientId') clientId: string,
    @Body() item: ClientDatapassAddDto,
  ): Promise<void> {
    const { sequence, name } = item;
    return this.commandBus.execute(
      new ClientDatapassAddCommand(clientId, sequence, name),
    );
  }
}
