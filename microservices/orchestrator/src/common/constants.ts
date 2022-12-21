import { EventEmitterModuleOptions } from '@nestjs/event-emitter/dist/interfaces';
import {
  SharedTimeOutInterceptor,
  SharedExceptionFilter,
} from 'beyondnet.nestjssharedlib/dist/src';

export enum TagEvents {
  CREATED = 'TAG.CREATED',
  ENABLED = 'TAG.ENABLED',
  DISABLED = 'TAG.DISABLED',
  DELETED = 'TAG.DELETED',
}

export enum CommonQueues {
  TagsQueue = 'tags',
  TagsEventsQueue = 'tags.events',
}

export enum MessageTagEventsPatterns {
  CREATE = 'CREATE_TAG_EVENT',
}

export enum MessageTagPatterns {
  CREATE = 'CREATE_TAG',
  CREATE_BATCH = 'CREATE_BATCH',
  ENABLE = 'ENABLE_TAG',
  DISABLE = 'DISABLE_TAG',
  DELETE = 'DELETE_TAG',
}

export const EmitterOptions: EventEmitterModuleOptions = {
  // set this to `true` to use wildcards
  wildcard: false,
  // the delimiter used to segment namespaces
  delimiter: '.',
  // set this to `true` if you want to emit the newListener event
  newListener: false,
  // set this to `true` if you want to emit the removeListener event
  removeListener: false,
  // the maximum amount of listeners that can be assigned to an event
  maxListeners: 10,
  // show event name in memory leak message when more than maximum amount of listeners is assigned
  verboseMemoryLeak: false,
  // disable throwing uncaughtException if an error event is emitted and it has no listeners
  ignoreErrors: false,
};

export const GlobalInterceptors = [new SharedTimeOutInterceptor()];
export const GlobalFilters = [new SharedExceptionFilter()];
