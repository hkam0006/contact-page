import { ContactForm } from "./ContactForm"

const contactMethods = [
  {
    title: "Contact Us Details",
    content: (
      <>
        <strong>Phone:</strong> 13 24 34
        <br />
        <strong>Email:</strong> support@openagent.com.au
      </>
    )
  },
  {
    title: "Postal Address",
    content: "PO Box 419, Alexandria NSW 1435"
  },
  {
    title: "Contact Centre Hours of Operation",
    content: "Monday - Friday 8:30 - 5:00"
  }
]

export default function ContactPage() {
  return (
    <section className="px-0 pb-4 sm:px-4 mt-12" aria-labelledby="contact-title">
      <div className="mx-auto max-w-6xl border border-slate-200 border-t-4 border-t-emerald-400 bg-white p-6 shadow-xl sm:p-8 lg:p-14 xl:p-16">
        <h1 id="contact-title" className="m-0 max-w-3xl text-3xl leading-tight text-slate-800 sm:text-4xl lg:text-5xl">
          Contact us, we love to hear from you
        </h1>

        <div className="mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          <aside className="max-w-xl text-sm leading-7 text-slate-700 sm:text-base" aria-label="Contact details">
            <p className="mb-4 mt-0">
              Welcome to OpenAgent. We&apos;ve been around since 2013, and our vision is to make it easy for people to
              buy, sell and own property.
            </p>
            <p className="mb-4 mt-0">Here are the different ways you can contact us.</p>

            <div className="my-6 grid gap-4 sm:my-7">
              {contactMethods.map((method) => (
                <section className="border-l-4 border-emerald-100 pl-4" key={method.title}>
                  <h2 className="mb-2 mt-0 text-sm font-bold text-slate-800 underline underline-offset-4">
                    {method.title}
                  </h2>
                  <p className="m-0">{method.content}</p>
                </section>
              ))}
            </div>

            <p className="mb-4 mt-0">
              For media enquiries, please visit our{" "}
              <a className="font-extrabold text-emerald-600 no-underline" href="/media-and-press">
                Media and Press
              </a>{" "}
              page.
            </p>
          </aside>

          <section className="w-full max-w-xl rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-lg sm:p-8 lg:ml-auto" aria-labelledby="form-title">
            <h2 id="form-title" className="m-0 text-sm leading-6 text-slate-700 sm:text-base">
              Fill in your details and we&apos;ll be in touch right away. Or if you prefer, call us on 13 24 34
            </h2>
            <ContactForm />
          </section>
        </div>
      </div>
    </section>
  )
}
