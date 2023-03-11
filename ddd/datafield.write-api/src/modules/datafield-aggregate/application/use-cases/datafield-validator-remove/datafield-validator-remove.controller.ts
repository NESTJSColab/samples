import { Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';
import { DataFieldValidatorRemoveCommand } from './datafield-validator-remove.command';

@ApiTags('DataField')
@Controller(`datafields`)
export class DataFieldValidatorRemoveController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Delete a Validator' })
  @Delete(':dafafieldId/datafields/:id')
  async create(
    @Param('datafieldId') datafieldId: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.commandBus.execute(
      new DataFieldValidatorRemoveCommand(datafieldId, id),
    );
  }
}
