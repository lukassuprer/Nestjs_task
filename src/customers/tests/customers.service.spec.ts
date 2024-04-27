import { Test } from '@nestjs/testing';
import { CustomersController } from '../customers.controller';
import { CustomersService } from '../customers.service';
import { Customer } from '../interfaces/customer.interface';
import { CreateCustomerDto } from '../dto';

describe('CustomersService', () => {
  let customersService: CustomersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [CustomersService],
    }).compile();

    customersService = moduleRef.get<CustomersService>(CustomersService);
  });

  describe('getAll', () => {
    it('should return an array of customers', async () => {
      const result: Customer[] = [{ id: 0, name: 'My name', birthdate: new Date('2001-01-01') }];
      jest.spyOn(customersService, 'getAll').mockImplementation(() => result);

      expect(await customersService.getAll()).toBe(result);
    });
  });

  describe('get', () => {
    it('should return a customer', () => {
      const id: number = 0;
      const result: Customer = {
        id: 0,
        name: 'My name',
        birthdate: new Date('2001-01-01'),
      };
      jest.spyOn(customersService, 'get').mockImplementation(() => result);

      expect(customersService.get(id)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a customer', async () => {
      const createCustomerDto: CreateCustomerDto = {
        id: 0,
        name: 'My name',
        birthdate: new Date('2001-01-01'),
      };

      const customer: Customer = {
        id: 0,
        name: 'My name',
        birthdate: new Date('2001-01-01'),
      };
      jest.spyOn(customersService, 'create').mockReturnValue(customer);

      const result = await customersService.create(createCustomerDto);

      expect(result).toBe(customer);
      expect(await customersService.create(createCustomerDto)).toBe(customer);
    });
  });

  describe('update', () => {
    it('should update a customer', () => {
      const customer: Customer = {
        id: 0,
        name: 'My name',
        birthdate: new Date('2001-01-01'),
      };
      jest.spyOn(customersService, 'update').mockImplementation(() => customer);

      expect(customersService.update(0, customer)).toBe(customer);
    });
  });
});
