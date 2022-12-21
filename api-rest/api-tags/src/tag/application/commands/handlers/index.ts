import { CreateTagCommandHandler } from './create-tag.handler';
import { DisableTagCommandHandler } from './disable-tag.handler';
import { DeleteTagCommandHandler } from './delete-tag.handler';
import { EnableTagCommandHandler } from './enable-tag.handler';

export const CommandHandlers = [
  CreateTagCommandHandler,
  DeleteTagCommandHandler,
  DisableTagCommandHandler,
  EnableTagCommandHandler,
];
