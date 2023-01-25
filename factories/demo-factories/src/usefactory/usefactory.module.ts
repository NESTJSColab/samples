import { DynamicModule, Module } from '@nestjs/common';

import { UseFactoryService } from './impl/usefactory.service';
import { UseFactoryModuleOption } from './interfaces';
import { USEFACTORY } from './usefactory-constants';
import { UseFactoryAExecutor } from './impl/executor-a.service';
import { UseFactoryBExecutor } from './impl/executor-b.service';

@Module({})
export class UseFactoryModule {
  public static forRoot(options: UseFactoryModuleOption): DynamicModule {
    const UseFactoryProvider = {
      provide: USEFACTORY,
      useValue: new UseFactoryService(options).getExecutor(),
    };

    return {
      module: UseFactoryModule,
      exports: [UseFactoryProvider, UseFactoryAExecutor, UseFactoryBExecutor],
      providers: [UseFactoryProvider, UseFactoryAExecutor, UseFactoryBExecutor],
    };
  }
}
