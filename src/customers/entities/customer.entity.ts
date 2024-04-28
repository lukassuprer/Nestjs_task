import { ApiProperty } from '@nestjs/swagger';

export class Customer {
    /**
     * The id of the customer
     * @example 1
     */

    @ApiProperty()
    id: number;

    /**
     * The name of the customer
     * @example Lukas Prochazka
     */

    @ApiProperty()
    name: string;

    /**
     * The birthdate of the customer
     * @example 2001-01-01
     */
    @ApiProperty()
    birthdate: Date;
}