export interface IRepository<T> {
  insert(entity: T): Promise<void>;
}
