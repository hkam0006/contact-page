import { Suspense } from "react"
import { ThankYouClient } from "./ThankYouClient"

export default function ThankYouPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="thank-you-title">
      <Suspense fallback={<p className="rounded-lg border border-dashed border-slate-200 p-7 text-center text-slate-500">Loading...</p>}>
        <ThankYouClient />
      </Suspense>
    </section>
  )
}
