"use client";
import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
};

export function Button({ className = "", variant = "default", size = "md", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 " +
    "disabled:opacity-50 disabled:pointer-events-none active:scale-95";
  const variants =
    variant === "outline"
      ? "border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-900"
      : "bg-black text-white hover:bg-black/90 shadow-sm hover:shadow-lg";
  const sizes =
    size === "sm" ? "h-8 px-3 text-sm" : size === "lg" ? "h-11 px-5 text-base" : "h-10 px-4";
  return <button className={`${base} ${variants} ${sizes} ${className}`} {...props} />;
}
export default Button;
