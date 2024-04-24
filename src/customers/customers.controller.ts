import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Get()
  async getAllCustomers(): Promise<Customer[]> {
    return this.customersService.getCustomers();
  }

  // get one customer by id
  @Get('/:id')
  getCustomer(@Param('id', ParseIntPipe) id: number): Customer {
    const customer = this.customersService.findCustomerById(id);
    if (!customer) throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    return customer;
  }

  // Create a new customer
  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    this.customersService.create(createCustomerDto);
  }

  // edit a customer by id
  @Put(':id')
  updateCustomer(@Param('id', ParseIntPipe) id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    this.customersService.update(id, updateCustomerDto);
  }
}
