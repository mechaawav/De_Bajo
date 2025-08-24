"use client";
import * as React from "react";

export function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`h-10 w-full rounded-md border px-3 outline-none focus:ring-2 ${className}`} {...props} />;
}
export default Input;
