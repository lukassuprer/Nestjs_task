import { Injectable } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';

@Injectable()
export class CustomersService {
  private readonly customers: Customer[] = [
    {
      id: 0,
      name: 'John Doe',
      birthdate: new Date('1980-01-01'),
    },
    {
      id: 1,
      name: 'Jane Doe',
      birthdate: new Date('1981-02-02'),
    },
  ];

  getCustomers(): Customer[] {
    return this.customers;
  }

  findCustomerById(id: number): Customer {
    return this.customers.find((customer) => customer.id === id);
  }

  create(customer: Customer) {
    customer.id = this.customers.length;
    this.customers.push(customer);
  }

  update(id: number, customer: Customer) {
    console.log('Updating customer with id: ', id);
    this.customers[id] = customer;
  }
}
