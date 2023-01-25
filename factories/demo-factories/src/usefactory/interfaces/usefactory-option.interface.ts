import { ModuleMetadata, Provider, Type } from '@nestjs/common';
import { UseFactoryOptionsFactory } from './usefactory-module.interface';

export interface UseFactoryModuleOption {
  type: string;
  values?: Record<string, any>;
}

export interface UseFactoryModuleOptionAsync
  extends Pick<ModuleMetadata, 'imports'> {
  /**
   * Injection token resolving to an existing provider. The provider must implement
   * the `UseFactoryOptions` interface.
   */
  useExisting?: Type<UseFactoryOptionsFactory>;
  /**
   * Injection token resolving to a class that will be instantiated as a provider.
   * The class must implement the `UseFactoryOptions` interface.
   */
  useClass?: Type<UseFactoryOptionsFactory>;

  /**
   * Function returning options (or a Promise resolving to options) to configure the
   * module.
   */
  useFactory?: (
    ...args: any[]
  ) => Promise<UseFactoryModuleOption> | UseFactoryModuleOption;

  /**
   * Dependencies that a Factory may inject.
   */
  inject?: any[];

  /**
   * extraProviders is used when you use useClass
   * in useClass you're using a class to configure the UseFactory module
   * Sometime that class has some dependencies like ConfigModule and ConfigService
   */
  extraProviders?: Provider[];
}
