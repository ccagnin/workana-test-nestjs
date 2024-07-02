import { HttpException, HttpStatus } from '@nestjs/common'

export class EmailAlreadyExistsException extends HttpException {
  constructor() {
    super('Email já cadastrado', HttpStatus.BAD_REQUEST)
  }
}
