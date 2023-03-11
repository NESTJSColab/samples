import { IntegrationEvent } from 'nestjscolab.ddd';

export class ClientDatapassTargetAddedIntegrationEvent extends IntegrationEvent {
  constructor(
    readonly clientId: string,
    readonly targetId: string,
    readonly datapassId: string,
    readonly sequence: number,
    readonly name: string,
  ) {
    super({
      eventName: ClientDatapassTargetAddedIntegrationEvent.name,
      aggregateId: clientId,
    });
  }
}
