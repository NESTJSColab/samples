import { UseFactoryModuleOption } from '../interfaces';
import { IUseFactoryExecutor } from '../interfaces/executor.interface';
import { UseFactoryAExecutor } from './executor-a.service';
import { UseFactoryBExecutor } from './executor-b.service';

export class UseFactoryService {
  constructor(private readonly options: UseFactoryModuleOption) {}

  getExecutor(): IUseFactoryExecutor {
    return this.options.type === 'A'
      ? new UseFactoryAExecutor()
      : new UseFactoryBExecutor();
  }
}
