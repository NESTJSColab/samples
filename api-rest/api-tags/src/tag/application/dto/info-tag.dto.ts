import { AutoMap } from "@automapper/classes";

export class TagDtoInfo {
  @AutoMap()
  id: string;
  @AutoMap()
  key: string;
  @AutoMap()
  name: string;
  @AutoMap()
  status: string;
}
