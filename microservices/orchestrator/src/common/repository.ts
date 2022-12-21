export interface IRepository<T> {
  insert(item: T): Promise<void>;
  delete(id: string): Promise<void>;
}
