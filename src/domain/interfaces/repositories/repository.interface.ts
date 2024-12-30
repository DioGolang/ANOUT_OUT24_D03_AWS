export interface Repository<CreateDto, Schema, UpdateDto> {
  create(dto: CreateDto): Promise<Schema>;
  update(id: string, dto: UpdateDto): Promise<Schema>;
  delete(): void;
  findId(id: string): Promise<Schema>;
}
