"use client";
import { cn } from "./cn";
import { Loader2 } from "lucide-react";
import React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl transition-all select-none " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-brand-ring " +
    "active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";

  const variants: Record<Variant, string> = {
    primary:
      "bg-brand-primary hover:bg-brand-primary600 text-white shadow-soft",
    secondary:
      "bg-brand-surface text-brand-text hover:bg-neutral-800 border border-neutral-700",
    ghost:
      "bg-transparent text-brand-text hover:bg-neutral-800/50 border border-transparent",
  };

  const sizes: Record<Size, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-5 text-sm md:text-base",
    lg: "h-12 px-6 text-base md:text-lg",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
