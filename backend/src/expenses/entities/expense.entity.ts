import { User } from 'src/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { ExpenseCategory } from '../enums/category.enum';

@Entity()
export class Expense {

  @PrimaryGeneratedColumn('uuid') // Auto-incrementing primary key
  id!:string; // ! indicates Don't worry, this value will be assigned later

  
  @Column()
  title!: string;

  @Column('decimal')
  amount!: number;

  @Column()
  category!:string;

  @CreateDateColumn()
  createdAt!: Date;
    
  @ManyToOne(() => User, (user) => user.expenses)
  user!: User;
}