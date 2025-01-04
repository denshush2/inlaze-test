import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    // testing sqlite doesn't support timestamps
    type: process.env.DB_TYPE === 'sqlite' ? 'datetime' : 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    // testing sqlite doesn't support timestamps
    type: process.env.DB_TYPE === 'sqlite' ? 'datetime' : 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    name: 'row_status',
    enum: ['active', 'deleted'],
    default: 'active',
  })
  rowStatus: 'active' | 'deleted';

  @Column({
    name: 'deleted_at',
    // testing sqlite doesn't support timestamps
    type: process.env.DB_TYPE === 'sqlite' ? 'datetime' : 'timestamp',
    nullable: true,
    default: null,
  })
  deletedAt: Date | null;

  @Column({
    name: 'deleted_by',
    nullable: true,
    default: null,
  })
  deletedBy: string | null;

  @Column({
    name: 'created_by',
    nullable: true,
    default: null,
  })
  createdBy: string | null;

  @Column({
    name: 'updated_by',
    nullable: true,
    default: null,
  })
  updatedBy: string | null;
}
