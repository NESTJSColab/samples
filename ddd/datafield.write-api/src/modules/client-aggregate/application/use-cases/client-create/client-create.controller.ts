import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';

import { ClientCreateDto } from '../../dto';
import { ClientCreateCommand } from './client-create.command';

@ApiTags('Client')
@Controller('clients')
export class ClientCreateController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create a Client' })
  @Post()
  async create(@Body() item: ClientCreateDto): Promise<void> {
    const { name, targets, datapasses } = item;
    return this.commandBus.execute(
      new ClientCreateCommand(name, targets, datapasses),
    );
  }
}
