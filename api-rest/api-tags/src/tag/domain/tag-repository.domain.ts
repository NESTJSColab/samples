import { ISharedReadRepository, ISharedWriteRepository } from "beyondnet.nestjssharedlib/dist/src";
import { TagDomain } from ".";

export interface ITagRepository extends ISharedReadRepository<string, TagDomain>, 
                                        ISharedWriteRepository<string, TagDomain> {
  getAll(): Promise<TagDomain[]>;
  getById(id: string): Promise<TagDomain>;
  getByKey(key: string): Promise<TagDomain[]>;
  insert(tag: TagDomain): Promise<void>;  
  update(id: string, tag: TagDomain): Promise<void>;
  delete(id: string): Promise<void>;
} 