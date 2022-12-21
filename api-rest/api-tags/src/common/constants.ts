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

export const GlobalInterceptors = [new SharedTimeOutInterceptor()];
export const GlobalFilters = [new SharedExceptionFilter()];
