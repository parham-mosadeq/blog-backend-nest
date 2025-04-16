import { BlogService } from './blog.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBlogDto } from './dtos';

@Controller('/api/v1/blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  getAllBlogs() {
    return 'all blogs';
  }

  @Get('/:id')
  getSingleBlog(@Param('id') id: string) {
    return `single blog ${id}`;
  }

  @Get('/category/:category')
  getCategoryBlog(@Param('category') category: string) {
    return `category ${category}`;
  }

  @Post('/create')
  // * Change the body type (dto)
  async createSingleBlog(@Body() body: CreateBlogDto) {
    const createdBlog = await this.blogService.create(body);

    return createdBlog;
  }
}
