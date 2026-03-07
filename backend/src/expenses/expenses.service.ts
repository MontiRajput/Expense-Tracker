import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Between, Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { User } from 'src/auth/entities/user.entity';
import { ExpenseCategory } from './enums/category.enum';

@Injectable()
export class ExpensesService {
    
    constructor(@InjectRepository(Expense) private readonly expenseRepository: Repository<Expense>) {}

 addExpense(expenseDto: CreateExpenseDto, userId: string) {

  const expense = this.expenseRepository.create({
    ...expenseDto,
    user: { id: userId } as User,
  });

  return this.expenseRepository.save(expense);
}

async getExpenses(userId:string){
    return await this.expenseRepository.find({where:{user:{id:userId}}});
}

async getExpenseByCategory(userId:string,category:ExpenseCategory){
    return await this.expenseRepository.find({where:{user:{id:userId},category:category}});
}

async deleteExpense(id: string, userId: string) {
  const expense = await this.expenseRepository.findOne({
    where: { id },
    relations: ['user'], // load relation to verify ownership
  });

  if (!expense || expense.user.id !== userId) {
    throw new NotFoundException(`Expense with id ${id} not found`);
  }

  await this.expenseRepository.remove(expense);

  return {
    message: `Expense with id ${id} deleted successfully`,
  };
}

async getExpensesByDateRange(userId:string,startDate:Date,endDate:Date){
    return await this.expenseRepository.find({where:{
        user:{id:userId},
        createdAt:Between(startDate,endDate)
    }});
}
}
