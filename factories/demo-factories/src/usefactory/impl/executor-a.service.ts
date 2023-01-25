import { Injectable } from '@nestjs/common';
import { IUseFactoryExecutor } from '../interfaces/executor.interface';

@Injectable()
export class UseFactoryAExecutor implements IUseFactoryExecutor {
  run(): string {
    return 'EXECUTOR A - executing a sync RUN method';
  }
  runaAsync(): Promise<string> {
    return Promise.resolve('EXECUTOR A - executing a Async RUN method');
  }
}
