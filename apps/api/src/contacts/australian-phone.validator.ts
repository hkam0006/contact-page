import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator"
import { parsePhoneNumberFromString } from "libphonenumber-js"

export function isAustralianPhoneNumber(value: unknown): boolean {
  if (typeof value !== "string") {
    return false
  }

  const parsed = parsePhoneNumberFromString(value, "AU")
  return Boolean(parsed?.isValid() && parsed.country === "AU")
}

export function IsAustralianPhoneNumber(validationOptions?: ValidationOptions): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      name: "isAustralianPhoneNumber",
      target: object.constructor,
      propertyName: String(propertyName),
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return isAustralianPhoneNumber(value)
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid Australian phone number`
        }
      }
    })
  }
}
