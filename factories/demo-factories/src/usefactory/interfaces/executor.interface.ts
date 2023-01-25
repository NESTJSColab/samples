export interface IUseFactoryExecutor {
  run(): string;
  runaAsync(): Promise<string>;
}
