import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueEmailActiveConstraint } from './unique-email-active.constraint';

export function uniqueEmailActive(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'uniqueEmailActive',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UniqueEmailActiveConstraint,
    });
  };
}
