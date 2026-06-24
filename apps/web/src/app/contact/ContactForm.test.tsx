import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { ContactForm } from "./ContactForm"

const push = vi.fn()

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push })
}))

describe("ContactForm", () => {
  beforeEach(() => {
    push.mockClear()
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ id: "contact-1" })
      })
    )
  })

  it("shows validation messages for required fields", async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.click(screen.getByRole("button", { name: /send message/i }))

    expect(screen.getByText("First name is required.")).toBeInTheDocument()
    expect(screen.getByText("Last name is required.")).toBeInTheDocument()
    expect(screen.getByText("Email is required.")).toBeInTheDocument()
    expect(screen.getByText("Phone is required.")).toBeInTheDocument()
  })

  it("submits valid details and redirects to the thank you page", async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/first name/i), "Alex")
    await user.type(screen.getByLabelText(/last name/i), "Nguyen")
    await user.type(screen.getByLabelText(/email/i), "alex@example.com")
    await user.type(screen.getByLabelText(/phone/i), "0412 345 678")
    await user.type(screen.getByLabelText(/what do you want to speak to us about/i), "Call after 2pm.")
    await user.click(screen.getByRole("button", { name: /send message/i }))

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/thank-you?firstName=Alex")
    })
  })
})
