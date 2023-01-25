import { Inject, Injectable } from '@nestjs/common';
import { IUseFactoryExecutor } from './usefactory/interfaces/executor.interface';

import { IUseValueExecutor } from './usevalue/interfaces/usevalue-executor.interface';
import { UseValueFactoryConstants } from './usevalue/usevalue-constant';
import { USEFACTORY } from './usefactory/usefactory-constants';

@Injectable()
export class AppService {
  constructor(
    @Inject(UseValueFactoryConstants.USEVALUE_FACTORY)
    private useValueExecutor: IUseValueExecutor,
    @Inject(USEFACTORY)
    private useFactoryExecutor: IUseFactoryExecutor,
  ) {}

  useValue(): string {
    console.log(this.useValueExecutor.execute());
    return '';
  }
  useFactory(): string {
    console.log(this.useFactoryExecutor.run());
    return '';
  }
}
