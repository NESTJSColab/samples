import { IUseValueExecutor } from '../interfaces/usevalue-executor.interface';
import { UseValueExecutorAService } from './usevalue-executor-a.service';
import { UseValueExecutorBService } from './usevalue-executor-b.service';

export class UseValueServiceFactory {
  constructor(private readonly options) {}

  getExecutor(): IUseValueExecutor {
    return this.options.type === 'A'
      ? new UseValueExecutorAService()
      : new UseValueExecutorBService();
  }
}
