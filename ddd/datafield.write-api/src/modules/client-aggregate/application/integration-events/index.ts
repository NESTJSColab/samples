import { ClientDatapassTargetAddedIntegrationEventHandler } from './client-assign-datapass-target';
import { ClientCreatedIntegrationEventHandler } from './client-created/client-created.integrationevent-handler';
import { ClientDatapassAddedIntegrationEventHandler } from './client-datapass-added';
import { ClientDatapassDeletedIntegrationEventHandler } from './client-datapass-deleted';
import { ClientDeletedIntegrationEventHandler } from './client-deleted/client-deleted.integrationevent-handler';
import { ClientDatapassTargetRemovedIntegrationEventHandler } from './client-remove-datapass-target';
import { ClientTargetAddedIntegrationEventHandler } from './client-target-added';
import { ClientTargetDeletedIntegrationEventHandler } from './client-target-deleted';

export { ClientCreatedIntegrationEvent } from './client-created';
export { ClientDeletedIntegrationEvent } from './client-deleted';
export { ClientDatapassTargetAddedIntegrationEvent } from './client-assign-datapass-target';
export { ClientDatapassTargetRemovedIntegrationEvent } from './client-remove-datapass-target';
export { ClientTargetAddedIntegrationEvent } from './client-target-added';
export { ClientTargetDeletedIntegrationEvent } from './client-target-deleted';
export { ClientDatapassAddedIntegrationEvent } from './client-datapass-added';
export { ClientDatapassDeletedIntegrationEvent } from './client-datapass-deleted';

export const integrationEventHandlers = [
  ClientCreatedIntegrationEventHandler,
  ClientDatapassTargetAddedIntegrationEventHandler,
  ClientDatapassTargetRemovedIntegrationEventHandler,
  ClientDeletedIntegrationEventHandler,
  ClientTargetAddedIntegrationEventHandler,
  ClientTargetDeletedIntegrationEventHandler,
  ClientDatapassAddedIntegrationEventHandler,
  ClientDatapassDeletedIntegrationEventHandler,
];
