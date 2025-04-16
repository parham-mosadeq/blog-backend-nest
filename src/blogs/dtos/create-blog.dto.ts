import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  content: string;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  image: string;

  @IsUUID()
  slug: string;

  @IsString()
  tags: string;

  @IsBoolean()
  published: boolean;

  @IsBoolean()
  isDraft: boolean;
}
