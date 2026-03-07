import { User } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Expense {

  @PrimaryGeneratedColumn() // Auto-incrementing primary key
  id!: number; // ! indicates Don't worry, this value will be assigned later

  
  @Column()
  title!: string;

  @Column('decimal')
  amount!: number;

  @Column()
  category!: string;

  @CreateDateColumn()
  createdAt!: Date;
    
  @ManyToOne(() => User, (user) => user.expenses)
  user!: User;
}