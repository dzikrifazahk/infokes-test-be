import { ApiProperty } from '@nestjs/swagger';

export class CommonResponse<Type> {
  @ApiProperty()
  public readonly message: string;

  @ApiProperty()
  public readonly data: Type | Type[] | null;

  public readonly errors: string[] | undefined = undefined;

  constructor(
    message: string,
    data: Type | Type[] | null,
    errors?: string[] | null,
  ) {
    this.message = message;
    this.data = data;
    this.errors = Array.isArray(errors) ? errors : undefined;
  }
}
