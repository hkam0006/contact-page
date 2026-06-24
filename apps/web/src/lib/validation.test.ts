import { describe, expect, it } from "vitest"
import { validateContact } from "./validation"

const validContact = {
  firstName: "Alex",
  lastName: "Nguyen",
  email: "alex@example.com",
  phone: "0412 345 678",
  note: "Please call after 2pm."
}

describe("validateContact", () => {
  it("accepts valid contact details", () => {
    expect(validateContact(validContact)).toEqual({})
  })

  it("requires first name, last name, email and phone", () => {
    const errors = validateContact({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      note: ""
    })

    expect(errors).toMatchObject({
      firstName: "First name is required.",
      lastName: "Last name is required.",
      email: "Email is required.",
      phone: "Phone is required."
    })
  })

  it("rejects invalid email and non-Australian phone numbers", () => {
    const errors = validateContact({
      ...validContact,
      email: "alex",
      phone: "+1 415 555 0132"
    })

    expect(errors.email).toBe("Enter a valid email address.")
    expect(errors.phone).toBe("Enter a valid Australian phone number.")
  })
})
