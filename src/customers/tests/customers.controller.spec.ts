import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { Customer } from '../interfaces/customer.interface';
import { CustomersController } from '../customers.controller';
import { CustomersService } from '../customers.service';

describe('CustomersController', () => {
    let customersController: CustomersController;

    const mockCustomersService = {
        create: jest.fn(),
        getAll: jest.fn(),
        get: jest.fn(),
        update: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CustomersController],
            providers: [
                {
                    provide: CustomersService,
                    useValue: mockCustomersService,
                },
            ],
        }).compile();

        customersController = module.get<CustomersController>(CustomersController);
    });

    it('should be defined', () => {
        expect(customersController).toBeDefined();
    });

    it('create => should create a new customer by a given data', async () => {
        // arrange
        const createCustomerDto = {
            name: 'My name',
            birthdate: new Date('2001-01-01'),
        } as CreateCustomerDto;

        const customer = {
            id: 0,
            name: 'My name',
            birthdate: new Date('2001-01-01'),
        } as Customer;

        jest.spyOn(mockCustomersService, 'create').mockReturnValue(customer);

        // act
        const result = await customersController.create(createCustomerDto);

        expect(mockCustomersService.create).toHaveBeenCalled();
        expect(mockCustomersService.create).toHaveBeenCalledWith(createCustomerDto);


        expect(result).toEqual(customer);
    });

    it('getAll => should return an array of user', async () => {
        //arrange
        const customer = {
            id: 0,
            name: 'My name',
            birthdate: new Date('2001-01-01'),
        } as Customer;
        const customers = [customer];
        jest.spyOn(mockCustomersService, 'getAll').mockReturnValue(customers);

        //act
        const result = await customersController.getAll();

        // assert
        expect(result).toEqual(customers);
        expect(mockCustomersService.getAll).toHaveBeenCalled();
    });

    it('get => should find a user by a given id and return its data', async () => {
        //arrange
        const id: number = 1;
        const customer = {
            id: 1,
            name: 'My name',
            birthdate: new Date('2001-01-01'),
        } as Customer;

        jest.spyOn(mockCustomersService, 'get').mockReturnValue(customer);

        //act
        const result = await customersController.get(id);

        expect(result).toEqual(customer);
        expect(mockCustomersService.get).toHaveBeenCalled();
        expect(mockCustomersService.get).toHaveBeenCalledWith(+id);
    });

    it('update => should find a user by a given id and update its data', async () => {
        //arrange
        const id: number = 1;
        const updateCustomerDto = {
            name: 'My name',
            birthdate: new Date('2001-01-01'),
        } as CreateCustomerDto;
        const customer = {
            id: 1,
            name: 'My name',
            birthdate: new Date('2001-01-01'),
        } as Customer;

        jest.spyOn(mockCustomersService, 'update').mockReturnValue(customer);

        //act
        const result = await customersController.update(id, updateCustomerDto);

        expect(result).toEqual(customer);
        expect(mockCustomersService.update).toHaveBeenCalled();
        expect(mockCustomersService.update).toHaveBeenCalledWith(+id, updateCustomerDto);
    });
});