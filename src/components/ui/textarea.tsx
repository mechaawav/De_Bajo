"use client";
import * as React from "react";

export function Textarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`min-h-[120px] w-full rounded-md border p-3 outline-none focus:ring-2 ${className}`} {...props} />;
}
export default Textarea;
