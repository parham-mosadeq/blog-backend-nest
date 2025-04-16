import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
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
  published: boolean;

  @Column({ type: 'boolean', default: true })
  isDraft: boolean;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
