import { Expense } from "src/expenses/entities/expense.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
@PrimaryGeneratedColumn('uuid')
id!: string;

@Column()
name!:string;

@Column()
email!:string;

@Column()
password!:string;

 @OneToMany(() => Expense, (expense) => expense.user)
  expenses!: Expense[];
}