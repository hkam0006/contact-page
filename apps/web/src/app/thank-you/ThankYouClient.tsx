"use client"

import { useSearchParams } from "next/navigation"
import { StyledButton } from "../../components/StyledButton"

export function ThankYouClient() {
  const searchParams = useSearchParams()
  const firstName = searchParams.get("firstName")?.trim() || "there"

  return (
    <div className="max-w-2xl rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-lg sm:p-8">
      <p className="mb-3 mt-0 text-xs font-extrabold uppercase tracking-wider text-emerald-700">Thank You</p>
      <h1 id="thank-you-title" className="m-0 text-2xl font-bold text-slate-800">
        Thank you, {firstName}.
      </h1>
      <p className="leading-6 text-slate-500">
        Your contact details have been saved.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <StyledButton href="/contact">
          Back
        </StyledButton>
      </div>
    </div>
  )
}
