import { ContactsList } from "./ContactsList"

export default function ContactsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="contacts-title">
      <p className="mb-3 mt-0 text-xs font-extrabold uppercase tracking-wider text-emerald-700">Contacts list</p>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-lg sm:p-8">
        <ContactsList />
      </div>
    </section>
  )
}
