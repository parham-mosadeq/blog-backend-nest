import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dtos';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {}

  private generateSlug(): string {
    return `${Math.floor(Math.random() * 100)}-${uuidv4()}`;
  }

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
    return this.find(id);
  }

  async create(data: CreateBlogDto): Promise<BlogEntity> {
    if (!data.slug) {
      data.slug = this.generateSlug();
    }

    const existingBlog = await this.blogRepository.findOne({
      where: { slug: data.slug },
    });

    if (existingBlog) {
      throw new ConflictException(
        'Slug already exists. Please choose a different slug.',
      );
    }

    const newBlog = this.blogRepository.create(data);
    return this.blogRepository.save(newBlog);
  }
}
