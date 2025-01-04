import { BaseEntity } from '@backend/common/entities/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { TaskEntity } from '@backend/modules/business/task/entities/task.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ name: 'username', unique: true })
  username: string;

  // Relations
  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];
}
