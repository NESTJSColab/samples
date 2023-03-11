import { Injectable } from '@nestjs/common';
import { ofType, Saga } from 'nestjscolab.ddd';
import { map, Observable } from 'rxjs';

import {
  DataFieldChangeFieldNameDomainEvent,
  DataFieldCreatedDomainEvent,
} from '../../domain/events';

@Injectable()
export class DataFieldSaga {
  @Saga()
  dataFieldCreated = (events$: Observable<any>): Observable<any> => {
    return events$.pipe(
      ofType(DataFieldCreatedDomainEvent),
      map((event) => console.log(event)),
    );
  };

  @Saga()
  dataFieldChangedFieldName = (events$: Observable<any>): Observable<any> => {
    return events$.pipe(
      ofType(DataFieldChangeFieldNameDomainEvent),
      map((event) => console.log(event)),
    );
  };
}
