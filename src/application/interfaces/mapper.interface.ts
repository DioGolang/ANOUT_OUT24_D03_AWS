export interface Mapper<Schema, Dto, DtoResponse> {
  schemaToDto(schema: Schema): Promise<DtoResponse>;
  dtoToSchema(dto: Dto): Promise<Schema>;
}
