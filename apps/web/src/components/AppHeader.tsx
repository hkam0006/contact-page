import Link from "next/link"
import { StyledButton } from "./StyledButton"

export function AppHeader() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:min-h-20 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link
          className="inline-flex items-center gap-3 text-base font-extrabold text-slate-800 no-underline"
          href="/contact"
          aria-label="OpenAgent contact home"
        >
          <span className="grid size-9 place-items-center rounded-full bg-emerald-600 text-xs tracking-wide text-white shadow-md" aria-hidden="true">
            OA
          </span>
          <span>OpenAgent</span>
        </Link>

        <nav className="flex w-full gap-2 sm:w-auto" aria-label="Primary navigation">
          <StyledButton href="/contact" variant="nav">
            Contact Us
          </StyledButton>
          <StyledButton href="/contacts" variant="nav">
            Contacts
          </StyledButton>
        </nav>
      </div>
    </header>
  )
}
