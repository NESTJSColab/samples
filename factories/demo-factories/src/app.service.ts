import { Inject, Injectable } from '@nestjs/common';

import { IUseValueExecutor } from './usevalue/interfaces/usevalue-executor.interface';
import { UseValueFactoryConstants } from './usevalue/usevalue-constant';

@Injectable()
export class AppService {
  constructor(
    @Inject(UseValueFactoryConstants.USEVALUE_FACTORY)
    private executor: IUseValueExecutor,
  ) {}

  getHello(): string {
    console.log(this.executor.execute());
    return '';
  }
}
