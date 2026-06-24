import { IsBoolean } from "class-validator"

export class UpdateContactDto {
  @IsBoolean()
  verified!: boolean
}
