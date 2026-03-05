import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],//Make the repository for the Expense entity available in this module
  providers: [ExpensesService],
  controllers: [ExpensesController]
})
export class ExpensesModule {}
