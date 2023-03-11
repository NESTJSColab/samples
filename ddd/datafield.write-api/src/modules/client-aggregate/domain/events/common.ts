export class DatapassEventDto {
  constructor(
    readonly id: string,
    readonly sequence: number,
    readonly name: string,
  ) {}
}

export class TargetEventDto {
  constructor(readonly id: string, readonly code, readonly name: string) {}
}
