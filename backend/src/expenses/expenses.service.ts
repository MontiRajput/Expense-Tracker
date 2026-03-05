import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpensesService {
    constructor(@InjectRepository(Expense) private readonly expenseRepository: Repository<Expense>) {}

    async createExpense(expenseDto: CreateExpenseDto){
        console.log('Creating expense with data:', expenseDto);
        return {message: 'Expense created successfully'};
    }
}
