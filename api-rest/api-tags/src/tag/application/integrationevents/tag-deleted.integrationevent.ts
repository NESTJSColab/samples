export class DeletedTagIntegrationEvent {
  constructor(public trackId: string, public id: string) { }
}