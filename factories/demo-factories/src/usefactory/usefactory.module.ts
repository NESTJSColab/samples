import { DynamicModule, Module, Provider } from '@nestjs/common';

import { UseFactoryService } from './impl/usefactory.service';
import {
  UseFactoryModuleOption,
  UseFactoryModuleOptionAsync,
  UseFactoryOptionsFactory,
} from './interfaces';
import { USEFACTORY, USEFACTORY_OPTIONS } from './usefactory-constants';
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
  public static forRootAsync(
    optionsAsync: UseFactoryModuleOptionAsync,
  ): DynamicModule {
    const UseFactoryProvider = {
      provide: USEFACTORY,
      useFactory: (options) => new UseFactoryService(options).getExecutor(),
      inject: [USEFACTORY_OPTIONS],
    };

    return {
      module: UseFactoryModule,
      imports: optionsAsync.imports,
      exports: [UseFactoryProvider, UseFactoryAExecutor, UseFactoryBExecutor],
      providers: [
        ...this.createAsyncProviders(optionsAsync),
        UseFactoryProvider,
        UseFactoryAExecutor,
        UseFactoryBExecutor,
        ...(optionsAsync.extraProviders || []),
      ],
    };
  }

  private static createAsyncProviders(
    optionsAsync: UseFactoryModuleOptionAsync,
  ): Provider[] {
    if (optionsAsync.useExisting || optionsAsync.useFactory) {
      return [this.createAsyncOptionsProvider(optionsAsync)];
    }
    return [
      this.createAsyncOptionsProvider(optionsAsync),
      {
        provide: optionsAsync.useClass,
        useClass: optionsAsync.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    optionsAsync: UseFactoryModuleOptionAsync,
  ): Provider {
    /**
     * This is going to be a factory provider and import in the list of providers
     * This provider make the options value available in CashifyProvider. Since it's a provider,
     * it can be injected in CashifyProvider
     */
    if (optionsAsync.useFactory) {
      return {
        provide: USEFACTORY_OPTIONS,
        useFactory: optionsAsync.useFactory,
        inject: optionsAsync.inject || [],
      };
    }

    /**
     * In consumer module, if we use useClass, the give class may have some dependencies,
     * like ConfigService (and it's module). But they are not available in this module's context.
     * So, we have an 'imports' object and extraProviders in forRootAsync method.
     * Then we can dynamically add them from consumer module. See example in example folder.
     */
    return {
      provide: USEFACTORY_OPTIONS,
      useFactory: async (optionsFactory: UseFactoryOptionsFactory) =>
        optionsFactory.createUseFactoryOptions(),
      inject: [optionsAsync.useExisting || optionsAsync.useClass],
    };
  }
}
