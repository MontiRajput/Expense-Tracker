import { Body, Controller, Post, Req } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Controller('expenses')
export class ExpensesController {
    constructor(private expensesServices: ExpensesService) {}
 
    @Post()
    createExpense(@Body() expenseDto:CreateExpenseDto, @Req() req) {
   console.log(req.user.sub);
        const userId=req.user.sub;
        return this.expensesServices.createExpense(expenseDto, userId);
    }
}
