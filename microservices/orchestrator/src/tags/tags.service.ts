import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import { TagCreatedEvent } from './events/tag-created.event';
import { TagEvents } from 'src/common/constants';
import { TagEnabledEvent } from './events/tag-enabled.event';
import { TagDisabledEvent } from './events/tag-disabled.event';
import { TagDeletedEvent } from './events/tag-deleted.event';
import { UrlTagApiBuilder } from 'src/common/builders';
import { CreateTagDto } from './dtos/projection';

@Injectable()
export class TagsService {
  private url = '';

  constructor(
    private readonly httpService: HttpService,
    private eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
  ) {
    this.url = UrlTagApiBuilder(this.configService);
  }

  create(
    createTagDto: CreateTagDto,
    trackId: string,
  ): Observable<AxiosResponse<any>> {
    return this.httpService
      .post(this.url, createTagDto, {
        headers: {
          trackId,
        },
      })
      .pipe(
        map((response) => {
          this.eventEmitter.emit(
            TagEvents.CREATED,
            new TagCreatedEvent(
              trackId,
              response.data.id,
              createTagDto.key,
              createTagDto.name,
            ),
          );
          return response;
        }),
      );
  }

  enable(id: string, trackId: string) {
    return this.httpService
      .put(`${this.url}/enable/${id}`, {
        headers: {
          trackId,
        },
      })
      .pipe(
        map((response) => {
          this.eventEmitter.emit(
            TagEvents.ENABLED,
            new TagEnabledEvent(trackId, response.data.id),
          );
          return response;
        }),
      );
  }

  disable(id: string, trackId: string) {
    return this.httpService
      .put(`${this.url}/disable/${id}`, {
        headers: {
          trackId,
        },
      })
      .pipe(
        map((response) => {
          this.eventEmitter.emit(
            TagEvents.DISABLED,
            new TagDisabledEvent(trackId, response.data.id),
          );
          return response;
        }),
      );
  }

  delete(id: string, trackId: string) {
    return this.httpService
      .delete(`${this.url}/${id}`, {
        headers: {
          trackId,
        },
      })
      .pipe(
        map((response) => {
          this.eventEmitter.emit(
            TagEvents.DELETED,
            new TagDeletedEvent(trackId, response.data.id),
          );
          return response;
        }),
      );
  }
}
