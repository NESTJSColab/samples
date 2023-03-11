import { ValidatorDeletedIntegrationEventHandler } from './validator-deleted/validator-deleted.integrationevent-handler';
import { ValidatorCreatedIntegrationEventHandler } from './validator-created';

export * from './constants';
export { ValidatorCreatedIntegrationEvent } from './validator-created';
export { ValidatorDeletedIntegrationEvent } from './validator-deleted';

export const integrationEventHandlers = [
  ValidatorCreatedIntegrationEventHandler,
  ValidatorDeletedIntegrationEventHandler,
];
