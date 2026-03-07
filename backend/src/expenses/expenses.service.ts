import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ExpensesService {
    
    constructor(@InjectRepository(Expense) private readonly expenseRepository: Repository<Expense>) {}

   async createExpense(expenseDto: CreateExpenseDto, userId: number) {

  const expense = this.expenseRepository.create({
    ...expenseDto,
    user: { id: userId } as User,
  });

  return this.expenseRepository.save(expense);
}
}
