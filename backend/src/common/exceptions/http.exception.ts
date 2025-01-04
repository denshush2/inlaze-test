import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

export class HttpException {
  @ApiProperty({
    name: 'statusCode',
    required: true,
    type: Number,
    description: 'Http status code',
  })
  statusCode: number;

  @ApiProperty({
    name: 'message',
    required: true,
    type: String,
    description: 'Http message',
  })
  message: string;
}
