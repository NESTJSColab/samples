export class CreateTagCommand {
  public trackId: string;
  constructor(public key: string, public name: string) { }
}