import { Injectable } from '@nestjs/common';

import { IUseValueExecutor } from '../interfaces/usevalue-executor.interface';

@Injectable()
export class UseValueExecutorAService implements IUseValueExecutor {
  execute(): string {
    return 'Executing A...';
  }
}
