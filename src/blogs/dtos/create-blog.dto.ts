import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsUUID()
  slug: string;

  @IsNotEmpty()
  @IsString()
  tags: string;

  @IsBoolean()
  @IsOptional()
  published: boolean = false;

  @IsBoolean()
  @IsOptional()
  isDraft: boolean = true;
}
