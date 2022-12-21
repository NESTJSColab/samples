import {
  SharedExceptionFilter,
  SharedTimeOutInterceptor,
} from 'beyondnet.nestjssharedlib/dist/src';

export enum CommonQueues {
  TagsEventsQueue = 'tags.events',
}

export enum MessageTagEventsPatterns {
  CREATE = 'CREATE_TAG_EVENT',
}

export const GlobalInterceptors = [new SharedTimeOutInterceptor()];
export const GlobalFilters = [new SharedExceptionFilter()];
