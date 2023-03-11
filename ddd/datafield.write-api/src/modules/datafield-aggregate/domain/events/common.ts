export class ValidatorEventDto {
  constructor(
    readonly id: string,
    readonly sequence: number,
    readonly name: string,
  ) {}
}

export class TargetEventDto {
  constructor(
    readonly id: string,
    readonly code: string,
    readonly name: string,
  ) {}
}
