import { Injectable } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';
import { faker } from '@faker-js/faker';
import { count } from 'console';

function createRandomCustomer(): Customer {
  return {
    id: 0,
    name: faker.internet.userName(),
    birthdate: faker.date.birthdate(),
  };
}

function setCustomerId(customer: Customer, id: number): Customer {
  return {
    ...customer,
    id,
  };
}

@Injectable()
export class CustomersService {
  private customers: Customer[] = faker.helpers.multiple(createRandomCustomer).map(setCustomerId);

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
