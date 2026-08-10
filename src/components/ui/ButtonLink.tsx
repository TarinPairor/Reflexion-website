import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function ButtonLink({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "light"; className?: string }) {
  return <Link className={`button button--${variant} ${className}`} href={href}>{children}<Icon name="arrow" width={18} height={18}/></Link>;
}
