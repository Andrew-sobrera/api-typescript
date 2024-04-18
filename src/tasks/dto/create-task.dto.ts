import { IsString, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  task: string;

  @IsInt()
  authorId: number;
}
