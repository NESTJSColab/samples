import { Injectable } from '@nestjs/common';
import { IUseFactoryExecutor } from '../interfaces/executor.interface';

@Injectable()
export class UseFactoryBExecutor implements IUseFactoryExecutor {
  run(): string {
    return 'EXECUTOR B - executing a sync RUN method';
  }
  runaAsync(): Promise<string> {
    return Promise.resolve('EXECUTOR B - executing a Async RUN method');
  }
}
