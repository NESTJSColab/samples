import { Injectable } from '@nestjs/common';
import { IUseValueExecutor } from '../interfaces/usevalue-executor.interface';

@Injectable()
export class UseValueExecutorBService implements IUseValueExecutor {
  execute(): string {
    return 'Executing B...';
  }
}
