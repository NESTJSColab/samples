import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';

import { ClientDeleteCommand } from './client-delete.command';

@ApiTags('Client')
@Controller('clients')
export class ClientDeleteController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Delete a Client' })
  @Delete(':id')
  async create(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new ClientDeleteCommand(id));
  }
}
