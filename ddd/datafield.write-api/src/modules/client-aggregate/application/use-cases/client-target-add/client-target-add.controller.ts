import { Body, Controller, Post, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';
import { ClientTargetAddDto } from '../../dto';

import { ClientTargetAddCommand } from './client-target-add.command';

@ApiTags('Client')
@Controller('clients')
export class ClientTargetAddController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Add a new target' })
  @Post('/:clientId/addtarget')
  async create(
    @Param('clientId') clientId: string,
    @Body() item: ClientTargetAddDto,
  ): Promise<void> {
    const { name } = item;
    return this.commandBus.execute(new ClientTargetAddCommand(clientId, name));
  }
}
