import { Module } from '@nestjs/common';
import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';

@Module({
  imports: [],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class AppModule { }
