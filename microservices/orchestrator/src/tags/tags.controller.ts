import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { MessageTagPatterns } from 'src/common/constants';
import { getTrackId } from 'src/common/helpers/trackid.helper';
import { CreateTagDto } from './dtos/projection';
import { TagsService } from './tags.service';

@Controller()
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @MessagePattern(MessageTagPatterns.CREATE)
  create(@Payload() payload: CreateTagDto, @Ctx() context: RmqContext) {
    return this.tagService.create(payload, getTrackId(context));
  }

  @MessagePattern(MessageTagPatterns.ENABLE)
  enable(@Payload() id: string, @Ctx() context: RmqContext) {
    return this.tagService.enable(id, getTrackId(context));
  }

  @MessagePattern(MessageTagPatterns.DISABLE)
  disable(@Payload() id: string, @Ctx() context: RmqContext) {
    return this.tagService.disable(id, getTrackId(context));
  }

  @MessagePattern(MessageTagPatterns.DELETE)
  delete(@Payload() id: string, @Ctx() context: RmqContext) {
    return this.tagService.delete(id, getTrackId(context));
  }
}
