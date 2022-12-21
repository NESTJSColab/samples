import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { CreatedTagDomainEvent } from 'src/tag/domain/domainevents';

@Injectable()
export class TagsSagas {
  @Saga()
  tagCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CreatedTagDomainEvent),
      delay(1000),
      map((event) => {
        return null;
      }),
    );
  };
}
