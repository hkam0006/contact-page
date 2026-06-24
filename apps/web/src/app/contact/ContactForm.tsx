"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { createContact, ContactPayload } from "../../lib/contact"
import { ContactFormErrors, validateContact } from "../../lib/validation"
import { StyledButton } from "../../components/StyledButton"

const initialValues: ContactPayload = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  note: ""
}

const fieldClass = "grid gap-1"
const labelClass = "sr-only"
const controlClass =
  "w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:text-base"
const errorClass = "min-h-0 text-xs font-bold text-red-700"
const linkClass = "font-extrabold text-emerald-600 no-underline"
const submitButtonClass =
  "mt-2 inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-emerald-600 px-4 py-3 text-xs font-extrabold uppercase tracking-wide text-white shadow-md transition hover:-translate-y-px hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:hover:translate-y-0"

export function ContactForm() {
  const router = useRouter()
  const [values, setValues] = useState<ContactPayload>(initialValues)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [formError, setFormError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField(field: keyof ContactPayload, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError("")

    const nextErrors = validateContact(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    try {
      await createContact(values)
      router.push(`/thank-you?firstName=${encodeURIComponent(values.firstName.trim())}`)
    } catch {
      setFormError("We could not save your contact details. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="mt-5 grid gap-3" onSubmit={handleSubmit} noValidate>
      <div className={fieldClass}>
        <label className={labelClass} htmlFor="firstName">
          First name
        </label>
        <input
          className={controlClass}
          id="firstName"
          name="firstName"
          autoComplete="given-name"
          placeholder="First name"
          value={values.firstName}
          onChange={(event) => updateField("firstName", event.target.value)}
          aria-invalid={Boolean(errors.firstName)}
          aria-describedby="firstName-error"
        />
        {errors.firstName && <span id="firstName-error" className={errorClass} role="status">
          {errors.firstName}
        </span>}
      </div>

      <div className={fieldClass}>
        <label className={labelClass} htmlFor="lastName">
          Last name
        </label>
        <input
          className={controlClass}
          id="lastName"
          name="lastName"
          autoComplete="family-name"
          placeholder="Last name"
          value={values.lastName}
          onChange={(event) => updateField("lastName", event.target.value)}
          aria-invalid={Boolean(errors.lastName)}
          aria-describedby="lastName-error"
        />
        {errors.lastName && <span id="lastName-error" className={errorClass} role="status">
          {errors.lastName}
        </span>}
      </div>

      <div className={fieldClass}>
        <label className={labelClass} htmlFor="email">
          Email address
        </label>
        <input
          className={controlClass}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby="email-error"
        />
        {errors.email && <span id="email-error" className={errorClass} role="status">
          {errors.email}
        </span>}
      </div>

      <div className={fieldClass}>
        <label className={labelClass} htmlFor="phone">
          Phone number
        </label>
        <input
          className={controlClass}
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Phone number"
          value={values.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby="phone-error"
        />
        <span id="phone-error" className={errorClass} role="status">
          {errors.phone}
        </span>
      </div>

      <div className={fieldClass}>
        <label className={labelClass} htmlFor="note">
          What do you want to speak to us about
        </label>
        <textarea
          className={`${controlClass} min-h-40 resize-y sm:min-h-56`}
          id="note"
          name="note"
          placeholder="What do you want to speak to us about"
          value={values.note}
          onChange={(event) => updateField("note", event.target.value)}
          aria-invalid={Boolean(errors.note)}
          aria-describedby="note-error"
        />
        <span id="note-error" className={errorClass} role="status">
          {errors.note}
        </span>
      </div>

      {formError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-bold text-red-700" role="alert">
          {formError}
        </div>
      ) : null}

      <StyledButton
        type="submit"
        color='primary'
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </StyledButton>

      <p className="m-0 text-xs leading-5 text-slate-500">
        By sending a message you agree to the{" "}
        <a className={linkClass} href="/terms-and-conditions">
          Terms and Conditions
        </a>{" "}
        and{" "}
        <a className={linkClass} href="/privacy-policy">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  )
}
