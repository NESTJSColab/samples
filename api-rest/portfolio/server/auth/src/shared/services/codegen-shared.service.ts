import { Injectable } from '@nestjs/common';

@Injectable()
class CodeGenShareBuilder {
  private static instance: CodeGenShareBuilder;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): CodeGenShareBuilder {
    if (!CodeGenShareBuilder.instance) {
      CodeGenShareBuilder.instance = new CodeGenShareBuilder();
    }

    return CodeGenShareBuilder.instance;
  }

  public build(value: string) {
    return `${value
      .substr(1, 3)
      .toUpperCase()}${Math.random().toString().padStart(3)}`;
  }
}

export default CodeGenShareBuilder;
