import { Injectable } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';

@Injectable()
export class CustomersService {
  private readonly customers: Customer[] = [
    {
      id: 0,
      name: 'My name',
      birthdate: new Date('2001-01-01'),
    },
    {
      id: 1,
      name: 'No Name',
      birthdate: new Date('1901-02-02'),
    },
  ];

  getAll(): Customer[] {
    return this.customers;
  }

  get(id: number): Customer {
    return this.customers.find((customer) => customer.id === id);
  }

  create(customer: Customer) {
    customer.id = this.customers.length;
    this.customers.push(customer);
    return customer;
  }

  update(id: number, customer: Customer) {
    this.customers[id] = customer;
    return customer;
  }
}
