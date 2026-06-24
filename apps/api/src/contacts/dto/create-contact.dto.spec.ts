import { validate } from "class-validator"
import { CreateContactDto } from "./create-contact.dto"

function validDto(overrides: Partial<CreateContactDto> = {}) {
  const dto = new CreateContactDto()
  dto.firstName = "Alex"
  dto.lastName = "Nguyen"
  dto.email = "alex@example.com"
  dto.phone = "0412 345 678"
  dto.note = "Please call after 2pm."
  return Object.assign(dto, overrides)
}

describe("CreateContactDto", () => {
  it("accepts valid contact input", async () => {
    await expect(validate(validDto())).resolves.toHaveLength(0)
  })

  it("requires names, email and phone", async () => {
    const errors = await validate(validDto({ firstName: "", lastName: "", email: "", phone: "" }))
    expect(errors.map((error) => error.property)).toEqual(
      expect.arrayContaining(["firstName", "lastName", "email", "phone"])
    )
  })

  it("rejects invalid email", async () => {
    const errors = await validate(validDto({ email: "not-an-email" }))
    expect(errors.some((error) => error.property === "email")).toBe(true)
  })

  it("rejects non-Australian phone numbers", async () => {
    const errors = await validate(validDto({ phone: "+1 415 555 0132" }))
    expect(errors.some((error) => error.property === "phone")).toBe(true)
  })
})
