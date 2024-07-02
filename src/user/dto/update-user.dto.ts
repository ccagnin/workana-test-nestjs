import { IsEmail, IsOptional, IsString, Length } from 'class-validator'
import { IsFullName } from 'src/decorators/is-full-name.decorator'

export class UpdateUserDto {
  @IsOptional()
  @IsFullName({ message: 'Por favor, insira seu nome completo' })
  @IsString()
  @Length(2, 100)
  name?: string

  @IsOptional()
  @IsEmail()
  @IsString()
  @Length(5, 100)
  email?: string
}
