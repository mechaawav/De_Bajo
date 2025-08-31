"use client";
import * as React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, title, children }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50 animate-[fadeIn_200ms_ease-out]"
        onClick={onClose}
      />
      <div
        className="absolute left-1/2 top-1/2 w-[95vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4 shadow-lg animate-[pop_180ms_ease-out]"
        role="dialog"
        aria-modal="true"
      >
        {title && <h2 className="mb-2 text-lg font-semibold">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
