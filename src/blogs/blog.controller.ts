import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('/api/v1/blogs')
export class BlogController {
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

  @Post('/create/:id')
  // * Change the body type (dto)
  createSingleBlog(@Body() body: Record<string, string>) {
    return `create blog ${body.name}`;
  }
}
