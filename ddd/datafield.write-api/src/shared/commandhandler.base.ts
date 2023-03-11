import { DddAggregateRoot } from 'nestjscolab.ddd';
import { DddEs } from 'nestjscolab.dddes';
import { EbEvent, EbEventBus, IEbCommandHandler } from 'nestjscolab.eb';

export abstract class FeaturesCommandHandler<
  TCommand,
  TAggregate extends DddAggregateRoot<any, any> = undefined,
> implements IEbCommandHandler<TCommand>
{
  constructor(
    private readonly _eventStore?: DddEs,
    private readonly _eventBus?: EbEventBus,
  ) {}

  abstract execute(command: TCommand): Promise<any>;

  protected async saveEventStore(aggregate: TAggregate) {
    await this._eventStore.saveEvents(
      aggregate.getId(),
      aggregate.getDomainEvents,
      aggregate.getVersion(),
    );
  }

  protected async publicIntegrationEvents(event: EbEvent) {
    await this._eventBus.publish(event);
  }
}
