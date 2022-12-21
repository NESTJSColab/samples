export class CreatedTagIntegrationEvent {
  constructor(public trackId: string, public id: string, public key: string, public name: string) { }
}