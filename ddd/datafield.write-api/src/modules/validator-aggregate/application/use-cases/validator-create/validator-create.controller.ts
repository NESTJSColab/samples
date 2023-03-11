import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';
import { ValidatorCreateDto } from '../../dto';

import { ValidatorCreateCommand } from './validator-create.command';

@ApiTags('Validator')
@Controller(`validators`)
export class ValidatorCreateController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create a Validator' })
  @Post()
  async create(@Body() item: ValidatorCreateDto): Promise<void> {
    return this.commandBus.execute(new ValidatorCreateCommand(item.name));
  }
}
