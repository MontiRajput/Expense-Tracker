import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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

  @Column({ type: 'date' })
  date!: string;

  @CreateDateColumn()
  createdAt!: Date;
}