import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {}

  async findAll() {
    return this.blogRepository.find();
  }

  async find(id: number) {
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) throw new NotFoundException(`No blog found with id: ${id}`);
    return blog;
  }

  async delete(id: number) {
    const currentBlog = await this.blogRepository.findOneBy({ id });
    if (!currentBlog)
      throw new NotFoundException(`No blog found with id: ${id}`);
    return this.blogRepository.delete({ id });
  }

  async update(data: Partial<BlogEntity>, id: number) {
    const currentBlog = await this.blogRepository.findOneBy({ id });
    if (!currentBlog)
      throw new NotFoundException(`No blog found with id: ${id}`);
    await this.blogRepository.update(id, { ...data });
    return this.find(id); // Return the updated blog
  }

  async create(data: Partial<BlogEntity>) {
    const newBlog = this.blogRepository.create(data);
    return this.blogRepository.save(newBlog);
  }
}
