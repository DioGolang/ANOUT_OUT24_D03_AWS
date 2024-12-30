import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description:
      'Access token generated for the user for authentication, format jWT.',
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZW1vIiwiaWF0IjoxNTE2MjM5MDIyfQ.4y4bHvJ8e3YQqY0Jj5d2sUk7J7fD1Q8sY5K2J6d2',
  })
  access_token: string;
}
