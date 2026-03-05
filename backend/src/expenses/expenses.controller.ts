import { Body, Controller, Post } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Controller('expenses')
export class ExpensesController {
    constructor(private expensesServices: ExpensesService) {}

    @Post()
    createExpense(@Body() expenseDto:CreateExpenseDto) {
        return this.expensesServices.createExpense(expenseDto);
    }
}
