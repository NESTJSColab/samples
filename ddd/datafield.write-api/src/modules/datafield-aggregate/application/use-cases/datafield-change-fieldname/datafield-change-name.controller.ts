import { Body, Controller, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus } from 'nestjscolab.ddd';

import { DataFieldChangeFieldNameDto } from '../../dto/datafield-change-name.dto';
import { DataFieldChangeFieldNameCommand } from './datafield-change-name.command';

@ApiTags('DataField')
@Controller(`datafields`)
export class DataFieldChangeFieldNameController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Change DatFieldName' })
  @Put()
  async update(@Body() item: DataFieldChangeFieldNameDto): Promise<void> {
    return this.commandBus.execute(
      new DataFieldChangeFieldNameCommand(item.id, item.newName),
    );
  }
}
