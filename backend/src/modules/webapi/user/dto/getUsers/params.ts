import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';

export class GetUsersQueryDto {
  @ApiProperty({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @IsOptional() // Allows the query parameter to be optional
  @Transform(({ value }) => parseInt(value, 10)) // Transform string to number
  @IsInt({ message: 'Page must be an integer' }) // Validate that it's an integer
  @Min(0, { message: 'Page must be at least 1' }) // Ensure the value is >= 1
  page?: number;
  @ApiProperty({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit',
  })
  limit?: number;

  @ApiProperty({
    name: 'order',
    required: false,
    enum: ['asc', 'desc'],
    enumName: 'User Order',
    description: 'Order',
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  @Transform(({ value }) => value.toLowerCase())
  order?: 'asc' | 'desc';

  @ApiProperty({
    name: 'username',
    required: false,
    type: String,
    description: 'Username',
  })
  @IsOptional()
  username?: string;
}
