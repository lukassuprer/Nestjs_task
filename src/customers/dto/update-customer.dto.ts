import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    birthdate: Date;
}