import { parsePhoneNumberFromString } from "libphonenumber-js"
import type { ContactPayload } from "./contact"

export type ContactFormErrors = Partial<Record<keyof ContactPayload, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isAustralianPhone(value: string) {
  const parsed = parsePhoneNumberFromString(value, "AU")
  return Boolean(parsed?.isValid() && parsed.country === "AU")
}

export function validateContact(values: ContactPayload): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!values.firstName.trim()) {
    errors.firstName = "First name is required."
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required."
  }

  if (!values.email.trim()) {
    errors.email = "Email is required."
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Enter a valid email address."
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone is required."
  } else if (!isAustralianPhone(values.phone)) {
    errors.phone = "Enter a valid Australian phone number."
  }

  if (values.note && values.note.length > 1000) {
    errors.note = "Note must be 1000 characters or less."
  }

  return errors
}
