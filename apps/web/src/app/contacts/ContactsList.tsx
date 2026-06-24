"use client"

import { useEffect, useState } from "react"
import { Contact, deleteContact, listContacts, verifyContact } from "../../lib/contact"
import { StyledButton } from "../../components/StyledButton"

const emptyStateClass = "rounded-lg border border-dashed border-slate-200 p-7 text-center text-slate-500"

function ContactsLoadingState() {
  return (
    <div className="grid gap-4" aria-label="Loading contacts" role="status">
      {[1, 2, 3].map((item) => (
        <div className="rounded-lg border border-slate-200 bg-white p-5" key={item}>
          <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="h-4 w-44 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-36 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading contacts...</span>
    </div>
  )
}

export function ContactsList() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [busyId, setBusyId] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)

    listContacts()
      .then((data) => {
        if (isMounted) {
          setContacts(data)
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Could not load contacts.")
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  async function handleVerify(contact: Contact) {
    setBusyId(contact.id)
    setError("")
    try {
      const updated = await verifyContact(contact.id)
      setContacts((current) => current.map((item) => (item.id === updated.id ? updated : item)))
    } catch {
      setError("Could not verify contact.")
    } finally {
      setBusyId(null)
    }
  }

  async function handleDelete(contact: Contact) {
    setBusyId(contact.id)
    setError("")
    try {
      await deleteContact(contact.id)
      setContacts((current) => current.filter((item) => item.id !== contact.id))
    } catch {
      setError("Could not delete contact.")
    } finally {
      setBusyId(null)
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 id="contacts-title" className="m-0 text-2xl font-bold text-slate-800">
            Contacts
          </h1>
          <p className="mb-0 mt-2 text-slate-500">Newest submissions appear first.</p>
        </div>
        <StyledButton href="/contact">
          New contact
        </StyledButton>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-bold text-red-700" role="alert">
          {error}
        </div>
      ) : null}

      {isLoading ? <ContactsLoadingState /> : null}

      {!isLoading && contacts.length === 0 ? (
        <div className={emptyStateClass}>
          <p>No contacts yet.</p>
          <StyledButton color='primary' href="/contact" className='mt-2'>
            Create the first contact
          </StyledButton>
        </div>
      ) : null}

      {contacts.length > 0 ? (
        <ul className="m-0 grid list-none gap-4 p-0">
          {contacts.map((contact) => (
            <li className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 lg:flex-row lg:items-start lg:justify-between" key={contact.id}>
              <article>
                <div className="flex flex-row">
                  <h3 className="m-0 text-lg font-bold text-slate-800">
                    {contact.firstName} {contact.lastName}
                  </h3>
                  {contact.verified ? (
                    <span className="inline-flex min-h-8 ml-2 items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
                      Verified
                    </span>
                  ) : null}
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                  <span>{contact.email}</span>
                  <span>{contact.phone}</span>
                  <span>{new Date(contact.createdAt).toLocaleString('AU')}</span>
                </div>
                {contact.note ? <p className="mb-0 mt-3 leading-6 text-slate-800">{contact.note}</p> : null}
              </article>

              <div className="flex flex-wrap items-start gap-2.5 lg:justify-end">
                <StyledButton
                  disabled={contact.verified || busyId === contact.id}
                  onClick={() => handleVerify(contact)}
                >
                  {contact.verified ? "Verified" : "Mark as verified"}
                </StyledButton>
                <StyledButton
                  type="button"
                  color='danger'
                  disabled={busyId === contact.id}
                  onClick={() => handleDelete(contact)}
                >
                  Delete
                </StyledButton>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )
}
