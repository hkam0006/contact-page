import React from "react"
import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { ContactsList } from "./ContactsList"

const contacts = [
  {
    id: "new-contact",
    firstName: "Alex",
    lastName: "Nguyen",
    email: "alex@example.com",
    phone: "0412 345 678",
    note: "Newest contact",
    verified: false,
    createdAt: "2026-06-23T03:00:00.000Z",
    updatedAt: "2026-06-23T03:00:00.000Z"
  },
  {
    id: "verified-contact",
    firstName: "Sam",
    lastName: "Patel",
    email: "sam@example.com",
    phone: "02 9123 4567",
    note: null,
    verified: true,
    createdAt: "2026-06-22T03:00:00.000Z",
    updatedAt: "2026-06-22T03:00:00.000Z"
  }
]

describe("ContactsList", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
        const url = String(input)

        if (url.endsWith("/contacts") && init?.method === "GET") {
          return Promise.resolve({
            ok: true,
            json: async () => contacts
          })
        }

        if (url.endsWith("/contacts/new-contact") && init?.method === "PATCH") {
          return Promise.resolve({
            ok: true,
            json: async () => ({ ...contacts[0], verified: true })
          })
        }

        if (url.endsWith("/contacts/new-contact") && init?.method === "DELETE") {
          return Promise.resolve({
            ok: true,
            json: async () => ({ id: "new-contact" })
          })
        }

        return Promise.resolve({
          ok: false,
          text: async () => "Unexpected request"
        })
      })
    )
  })

  it("renders contacts and disables verification for verified contacts", async () => {
    render(<ContactsList />)

    expect(await screen.findByText("Alex Nguyen")).toBeInTheDocument()
    expect(screen.getByText("Sam Patel")).toBeInTheDocument()

    const verifiedCard = screen.getByText("Sam Patel").closest("li")
    expect(verifiedCard).not.toBeNull()
    expect(within(verifiedCard as HTMLElement).getByRole("button", { name: "Verified" })).toBeDisabled()
  })

  it("marks a contact as verified", async () => {
    const user = userEvent.setup()
    render(<ContactsList />)

    const card = (await screen.findByText("Alex Nguyen")).closest("li") as HTMLElement
    await user.click(within(card).getByRole("button", { name: /mark as verified/i }))

    await waitFor(() => {
      expect(within(card).getByRole("button", { name: "Verified" })).toBeDisabled()
    })
  })

  it("removes a deleted contact from the list", async () => {
    const user = userEvent.setup()
    render(<ContactsList />)

    const card = (await screen.findByText("Alex Nguyen")).closest("li") as HTMLElement
    await user.click(within(card).getByRole("button", { name: /delete/i }))

    await waitFor(() => {
      expect(screen.queryByText("Alex Nguyen")).not.toBeInTheDocument()
    })
  })
})
