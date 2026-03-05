import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//postgresql connection 
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesModule } from './expenses/expenses.module';
import { ConfigModule } from '@nestjs/config';



@Module({

  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
}), ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
