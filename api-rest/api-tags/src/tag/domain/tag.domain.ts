import { AggregateRoot } from '@nestjs/cqrs';

import {
  CreatedTagDomainEvent,
  DeletedTagDomainEvent,
  DisabledTagDomainEvent,
  EnabledTagDomainEvent,
} from './domainevents';
import { TagDomainException } from './exception.domain';
import { Id } from './id.domain';
import { Key } from './key.domain';
import { Name } from './name.domain';
import { TrackId } from './trackid.domain';

export enum TagStatus {
  Active = 1,
  Inactive = 0,
}

export class Tag extends AggregateRoot {
  constructor(
    public readonly trackId: TrackId,
    public readonly id: Id,
    public readonly key: Key,
    public name: Name,
    public status: TagStatus = TagStatus.Active,
  ) {
    super();

    this.id = id;
    this.key = key;
    this.name = name;

    this.apply(
      new CreatedTagDomainEvent(
        this.trackId.value(),
        this.id.value(),
        this.key.value(),
        this.name.value(),
      ),
    );
  }

  public static Create(trackId: TrackId, id: Id, key: Key, name: Name): Tag {
    return new Tag(trackId, id, key, name, TagStatus.Active);
  }

  public Disable(trackId: TrackId): void {
    if (!this.status)
      throw new TagDomainException(
        `Tag ${this.name.value} for key ${this.key.value} is already inactive`,
      );

    this.status = TagStatus.Inactive;

    this.apply(new DisabledTagDomainEvent(trackId.value(), this.id.value()));
  }

  public Enable(trackId: TrackId): void {
    if (this.status)
      throw new TagDomainException(
        `Tag ${this.name.value} for key ${this.key.value} is already avtive`,
      );

    this.status = TagStatus.Active;

    this.apply(new EnabledTagDomainEvent(trackId.value(), this.id.value()));
  }

  public Delete(trackId: TrackId): void {
    if (this.status)
      throw new TagDomainException(
        `Tag ${this.name.value} for key ${this.key.value} is already avtive`,
      );

    this.status = TagStatus.Active;

    this.apply(new DeletedTagDomainEvent(trackId.value(), this.id.value()));
  }
}
