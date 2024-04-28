import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Customer } from './entities/customer.entity';

@ApiBearerAuth()
@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Get()
  @ApiOperation({ summary: 'get all customers' })
  @ApiResponse({ status: 200, description: 'The found records', type: Customer, isArray: true })
  async getAll(): Promise<Customer[]> {
    return this.customersService.getAll();
  }


  @Get('/:id')
  @ApiOperation({ summary: 'get customer by id' })
  @ApiResponse({ status: 200, description: 'The found record', type: Customer })
  async get(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    const customer = this.customersService.get(id);
    if (!customer) throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    return customer;
  }

  @Post()
  @ApiOperation({ summary: 'create customer' })
  @ApiResponse({ status: 403, description: 'forbidden.' })
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update customer' })
  @ApiResponse({ status: 403, description: 'forbidden.' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(id, updateCustomerDto);
  }
}
