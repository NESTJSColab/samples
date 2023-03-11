import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';

import { DataFieldValidatorAddDto } from '../../dto';
import { DataFieldValidatorAddCommand } from './datafield-validator-add.command';

@ApiTags('DataField')
@Controller(`datafields`)
export class DataFieldValidatorAddController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create a Validator' })
  @Post('/:dataFieldId/validators')
  async create(
    @Param('dataFieldId') dataFieldId: string,
    @Body() item: DataFieldValidatorAddDto,
  ): Promise<void> {
    const { sequence, validatorId, validatorName } = item;
    return this.commandBus.execute(
      new DataFieldValidatorAddCommand(
        dataFieldId,
        sequence,
        validatorId,
        validatorName,
      ),
    );
  }
}
