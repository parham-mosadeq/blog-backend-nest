import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blogs')
export class BlogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column({ length: 100 })
  title: string;

  @Column()
  author: string;

  @Column()
  image: string;

  @Column({ type: 'uuid', unique: true })
  slug: string;

  @Column()
  tags: string;

  @Column({ type: 'boolean', default: false })
  published: string;

  @Column({ type: 'boolean', default: true })
  isDraft: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
