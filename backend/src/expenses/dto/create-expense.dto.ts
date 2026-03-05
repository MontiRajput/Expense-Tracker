import { IsString, IsNumber, IsDateString, IsNotEmpty, IsEnum } from 'class-validator';
import { ExpenseCategory } from '../enums/category.enum';

export class CreateExpenseDto {

  @IsString()
  @IsNotEmpty()
  title!: string;

   @IsNotEmpty()
  @IsNumber()
  amount!: number;

   @IsNotEmpty()
 @IsEnum(ExpenseCategory)
  category!: ExpenseCategory;

}