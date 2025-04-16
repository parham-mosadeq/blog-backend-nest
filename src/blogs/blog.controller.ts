import { BlogService } from './blog.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBlogDto } from './dtos';

@Controller('/api/v1/blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  getAllBlogs() {
    return this.blogService.findAll();
  }

  @Get('/:id')
  getSingleBlog(@Param('id') id: string) {
    if (!parseInt(id)) {
      throw new BadRequestException('Id must be of type number');
    }

    const blog = this.blogService.find(+id);
    return blog;
  }

  @Get('/category/:category')
  getCategoryBlog(@Param('category') category: string) {
    return `category ${category}`;
  }

  @Post('/create')
  async createSingleBlog(@Body() body: CreateBlogDto) {
    const createdBlog = await this.blogService.create(body);

    return createdBlog;
  }

  @Patch('/update/:id')
  async updateBlog(
    @Body() body: Partial<CreateBlogDto>,
    @Param('id') id: string,
  ) {
    if (!parseInt(id)) {
      throw new BadRequestException('Id must be of type number');
    }
    const createdBlog = await this.blogService.update(body, +id);

    return createdBlog;
  }

  @Delete('/delete/:id')
  deleteBlog(@Param('id') id: string) {
    if (!parseInt(id)) {
      throw new BadRequestException('Id must be of type number');
    }
    return this.blogService.delete(+id);
  }
}
