import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class AppController {
 @Get()
getApiInfo() {
  return {
    name: "Expense Tracker API",
    version: "1.0",
    status: "running"
  };
}



}
