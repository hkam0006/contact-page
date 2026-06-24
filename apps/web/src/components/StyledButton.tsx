import Link from "next/link"
import type { ButtonHTMLAttributes, ReactNode } from "react"

const baseButtonClass =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg px-4 py-2.5 font-extrabold no-underline transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
const navButtonClass =
  "flex min-h-10 flex-1 items-center justify-center rounded-full border border-transparent px-4 py-2 text-sm font-bold text-slate-500 no-underline hover:border-slate-200 hover:bg-slate-50 hover:text-slate-800 sm:flex-none"

type ButtonColorType = "primary" | "secondary" | "danger"
type ButtonVariantType = "button" | "nav"

const buttonColorClasses: Record<ButtonColorType, string> = {
  primary: "border border-transparent bg-emerald-600 text-white shadow-md hover:bg-emerald-700",
  secondary: "border border-emerald-200 bg-white text-emerald-600",
  danger: "border border-red-200 bg-white text-red-700"
}

type StyledButtonBaseProps = {
  children: ReactNode
  color?: ButtonColorType
  variant?: ButtonVariantType
  className?: string
}

type LinkProps = StyledButtonBaseProps & {
  href: string
}

type ButtonProps = (
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
  } & StyledButtonBaseProps
)

type StyledButton =
  | LinkProps
  | ButtonProps

export function StyledButton(props: StyledButton) {
  const color = props.color ?? "secondary"
  const variant = props.variant ?? "button"
  const buttonClassName = variant === "nav" ? navButtonClass : `${baseButtonClass} ${buttonColorClasses[color]}`
  const className = props.className ? `${buttonClassName} ${props.className}` : buttonClassName

  if (props.href !== undefined) {
    return (
      <Link className={className} href={props.href}>
        {props.children}
      </Link>
    )
  }

  const { color: _color, variant: _variant, ...buttonProps } = props

  return (
    <button className={className} {...buttonProps}>
      {buttonProps.children}
    </button>
  )
}
