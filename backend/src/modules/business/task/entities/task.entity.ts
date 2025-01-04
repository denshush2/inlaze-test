import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { BaseEntity } from '@backend/common/entities/base-entity';
import { TASK_STATUS, TaskStatus } from '@backend/interfaces/taskStatus.type';
@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity {
  @Column({ name: 'task_public_id', unique: true })
  taskPublicId: string;

  @Column({
    name: 'title',
    nullable: false,
  })
  title: string;

  @Column({
    name: 'description',
    nullable: true,
  })
  description: string | null;

  @Column({
    name: 'due_date',
    nullable: true,
  })
  dueDate: Date | null;

  @Column({
    name: 'status',
    nullable: false,
    enum: TASK_STATUS,
    default: TASK_STATUS.Open,
  })
  status: TaskStatus;

  // Relations
  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  // Triggers
  @BeforeInsert()
  beforeInsert() {
    this.taskPublicId = uuidv4();
  }
}
