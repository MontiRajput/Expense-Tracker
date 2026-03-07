import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Query, Req } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseCategory } from './enums/category.enum';

@Controller('expenses')
export class ExpensesController {
    constructor(private expensesServices: ExpensesService) {}
 
    @Post()
    createExpense(@Body() expenseDto:CreateExpenseDto, @Req() req) {
        const userId=req.user.id;
        return this.expensesServices.addExpense(expenseDto, userId);
    }

   @Get()
async getExpense(
  @Req() req,
  @Query('category') category?: ExpenseCategory,
  @Query('startDate') startDate?: string,
  @Query('endDate') endDate?: string,
) {

  const userId = req.user.id;

  // date filter
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    end.setHours(23, 59, 59, 999);//this will set the end date time to the end of that day 

    return await this.expensesServices.getExpensesByDateRange(userId,start,end);
  }

  // category filter
  if (category) {
    return this.expensesServices.getExpenseByCategory(userId, category);
  }

  // get all expenses
  return this.expensesServices.getExpenses(userId);
}



    @Delete(':id')
    async deleteExpense(@Param('id',new ParseUUIDPipe()) id:string,@Req() req){
        const userId=req.user.id;
        return await this.expensesServices.deleteExpense(id,userId);
    }

    
}
