import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'

@ValidatorConstraint({ name: 'isPasswordMatching', async: false })
export class IsPasswordMatchingConstraint
  implements ValidatorConstraintInterface
{
  validate(passwordConfirmation: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints
    const password = (args.object as Record<string, any>)[relatedPropertyName]
    return password === passwordConfirmation
  }

  defaultMessage() {
    return 'As senhas não correspondem'
  }
}

export function IsPasswordMatching(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsPasswordMatchingConstraint,
    })
  }
}
