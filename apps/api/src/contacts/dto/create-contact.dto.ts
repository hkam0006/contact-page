import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"
import { IsAustralianPhoneNumber } from "../australian-phone.validator"

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  firstName!: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  lastName!: string

  @IsEmail()
  @MaxLength(254)
  email!: string

  @IsString()
  @IsAustralianPhoneNumber()
  phone!: string

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  note?: string
}
