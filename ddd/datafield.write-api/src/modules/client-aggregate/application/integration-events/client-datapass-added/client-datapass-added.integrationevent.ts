import { IntegrationEvent } from 'nestjscolab.ddd';

export class ClientDatapassAddedIntegrationEvent extends IntegrationEvent {
  constructor(
    readonly clientId: string,
    readonly id: string,
    readonly sequence: number,
    readonly name: string,
  ) {
    super({
      eventName: ClientDatapassAddedIntegrationEvent.name,
      aggregateId: id,
    });
  }
}
