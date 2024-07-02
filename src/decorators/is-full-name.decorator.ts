import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'

@ValidatorConstraint({ name: 'isFullName', async: false })
export class IsFullNameConstraint implements ValidatorConstraintInterface {
  validate(name: string): boolean {
    if (typeof name !== 'string') return false
    const fullName = name.trim().split(/\s+/)
    return fullName.length > 1
  }

  defaultMessage(): string {
    return 'O nome deve conter pelo menos um sobrenome'
  }
}

export function IsFullName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFullNameConstraint,
    })
  }
}
