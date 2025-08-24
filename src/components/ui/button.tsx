"use client";
import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
};

export function Button({ className = "", variant = "default", size = "md", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants =
    variant === "outline"
      ? "border border-neutral-300 hover:bg-neutral-50"
      : "bg-black text-white hover:bg-black/90";
  const sizes = size === "sm" ? "h-8 px-3 text-sm" : size === "lg" ? "h-11 px-5 text-base" : "h-10 px-4";
  return <button className={`${base} ${variants} ${sizes} ${className}`} {...props} />;
}
export default Button;
