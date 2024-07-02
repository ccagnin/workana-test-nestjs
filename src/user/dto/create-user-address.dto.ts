import { IsString, IsNotEmpty, IsPostalCode } from 'class-validator'

export class CreateUserAddressDto {
  @IsString()
  @IsNotEmpty()
  street: string

  @IsString()
  @IsNotEmpty()
  neighborhood: string

  @IsString()
  @IsNotEmpty()
  number: string

  @IsString()
  complement: string

  @IsString()
  @IsNotEmpty()
  cidade: string

  @IsString()
  @IsNotEmpty()
  estado: string

  @IsPostalCode('BR')
  zip: string
}
