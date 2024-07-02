import { Type } from 'class-transformer'
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator'
import { IsFullName } from 'src/decorators/is-full-name.decorator'
import { IsPasswordMatching } from 'src/decorators/is-password-matching.decorator'
import { CreateUserAddressDto } from 'src/user/dto/create-user-address.dto'

export class CreateUserDto {
  @IsFullName({ message: 'Por favor, insira seu nome completo' })
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @IsStrongPassword()
  password: string

  @IsNotEmpty()
  @IsPasswordMatching('password')
  passwordConfirmation: string

  refreshToken: string

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserAddressDto)
  addresses: CreateUserAddressDto
}
