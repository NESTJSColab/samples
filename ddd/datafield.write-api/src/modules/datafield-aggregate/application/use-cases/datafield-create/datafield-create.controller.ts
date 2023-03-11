import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';

import { DataFieldCreateDto } from '../../dto';
import { DataFieldCreateCommand } from './datafield-create.command';

@ApiTags('DataField')
@Controller(`datafields`)
export class DataFieldCreateController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create a DataField' })
  @Post()
  async create(@Body() item: DataFieldCreateDto): Promise<void> {
    const { sequence, fieldName, target, validators } = item;

    return this.commandBus.execute(
      new DataFieldCreateCommand(target, sequence, fieldName, []),
    );
  }
}
