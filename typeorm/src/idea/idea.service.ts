import { UpdateIdeaDto } from './dto/idea.dto';
import { Mapper } from '@automapper/types';
import { InjectMapper } from '@automapper/nestjs';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { CreateIdeaDto, IdeaDto, ApproveIdeaDto } from './dto';
import { PaginationQueryDto } from 'src/shared/dto';
import { Audit, Event, Idea, Tag, User } from 'src/database/entities';
import { UserDto } from 'src/user/dto';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Idea)
    private readonly ideaRepository: Repository<Idea>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<User>,
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly connection: Connection,
  ) {}

  async GetAll({ offset, limit }: PaginationQueryDto): Promise<IdeaDto[]> {
    const dataTable = await this.ideaRepository.find({
      relations: ['items'],
      skip: offset,
      take: limit,
    });

    return await this.mapper.mapArrayAsync(dataTable, IdeaDto, Idea);
  }

  async GetById(id: string): Promise<IdeaDto> {
    const dataTable = await this.ideaRepository.findOne(id, {
      relations: ['items'],
    });

    if (!dataTable) {
      throw new NotFoundException(`Idea with ${id} does not found`);
    }

    return await this.map(dataTable);
  }

  async Create(dto: CreateIdeaDto): Promise<IdeaDto> {
    const tags: Tag[] = await Promise.all(
      dto.tags.map((t) => this.preLoadTagsByName(t)),
    );

    const idea = this.ideaRepository.create({
      ...dto,
      owner: await this.preLoadUserByName(dto.owner),
      tags,
      audit: {
        ...new Audit(),
        createdBy: dto.owner,
        timestamp: +new Date(),
      },
    });

    const dataTable = await this.ideaRepository.save(idea);

    return await this.map(dataTable);
  }

  async Update(id: string, dto: UpdateIdeaDto): Promise<IdeaDto> {
    const tags =
      dto.tags &&
      (await Promise.all(dto.tags.map((name) => this.preLoadTagsByName(name))));

    const idea = await this.ideaRepository.preload({
      id,
      ...dto,
      owner: await this.preLoadUserByName(dto.owner),
      tags,
    });

    if (!idea) throw new NotFoundException(`Idea with id: ${id} not found.`);

    const dataTable = await this.ideaRepository.save(idea);

    return await this.map(dataTable);
  }

  async Remove(id: string): Promise<IdeaDto> {
    return null;
  }

  // TODO: Refactor this as Generics and Helpers (DRY)
  private async preLoadUserByName(username: string): Promise<UserDto> {
    try {
      const existingUser = await this.userRepository.findOne({ username });

      if (existingUser) {
        return existingUser;
      }

      const dataTable = await this.userRepository.create({ username });

      return await this.mapper.mapAsync(dataTable, UserDto, User);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async preLoadTagsByName(name: string): Promise<Tag> {
    try {
      const existingTag = await this.tagRepository.findOne({ name });

      if (existingTag) {
        return existingTag;
      }

      return await this.tagRepository.create({ name });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async Approve(dto: ApproveIdeaDto) {
    const idea = await this.ideaRepository.preload({ id: dto.id });

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      idea.description = 'approved';

      const approveEvent = new Event();
      approveEvent.name = 'approve_idea';
      approveEvent.type = 'idea';
      approveEvent.payload = { id: dto.id };

      await queryRunner.manager.save(idea);
      await queryRunner.manager.save(approveEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async map(dataTable: Idea): Promise<IdeaDto> {
    return await this.mapper.mapAsync(dataTable, IdeaDto, Idea);
  }
}
