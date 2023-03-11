import { IntegrationEvent } from 'nestjscolab.ddd';

export class ClientDatapassTargetRemovedIntegrationEvent extends IntegrationEvent {
  constructor(
    readonly clientId: string,
    readonly targetId: string,
    readonly datapassId: string,
  ) {
    super({
      eventName: ClientDatapassTargetRemovedIntegrationEvent.name,
      aggregateId: clientId,
    });
  }
}
