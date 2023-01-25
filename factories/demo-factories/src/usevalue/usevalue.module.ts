import { DynamicModule, Module } from '@nestjs/common';

import { UseValueExecutorAService } from './service/usevalue-executor-a.service';
import { UseValueExecutorBService } from './service/usevalue-executor-b.service';
import { UseValueFactoryConstants } from './usevalue-constant';
import { UseValueOptions } from './usevalue-options';

@Module({})
export class UseValueFactoryModule {
  public static forRoot(options: UseValueOptions): DynamicModule {
    const UseValueFactoryProvider = {
      provide: UseValueFactoryConstants.USEVALUE_FACTORY,
      useValue:
        options.type === 'A'
          ? new UseValueExecutorAService()
          : new UseValueExecutorBService(),
    };

    return {
      module: UseValueFactoryModule,
      exports: [
        UseValueExecutorAService,
        UseValueExecutorBService,
        UseValueFactoryProvider,
      ],
      providers: [
        UseValueExecutorAService,
        UseValueExecutorBService,
        UseValueFactoryProvider,
      ],
    };
  }
}
