import { request } from "./api"

export type Contact = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  note: string | null
  verified: boolean
  createdAt: string
  updatedAt: string
}

export type ContactPayload = {
  firstName: string
  lastName: string
  email: string
  phone: string
  note?: string
}

export function createContact(payload: ContactPayload) {
  return request<Contact>("/contacts", {
    method: "POST",
    body: JSON.stringify(payload)
  })
}

export function listContacts() {
  return request<Contact[]>("/contacts", {
    method: "GET",
    cache: "no-store"
  })
}

export function verifyContact(id: string) {
  return request<Contact>(`/contacts/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ verified: true })
  })
}

export function deleteContact(id: string) {
  return request<{ id: string }>(`/contacts/${id}`, {
    method: "DELETE"
  })
}
