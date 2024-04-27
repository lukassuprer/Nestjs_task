import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Get()
  async getAll(): Promise<Customer[]> {
    return this.customersService.getAll();
  }

  // get one customer by id
  @Get('/:id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    const customer = this.customersService.get(id);
    if (!customer) throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    return customer;
  }

  // Create a new customer
  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  // edit a customer by id
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto);
  }
}
