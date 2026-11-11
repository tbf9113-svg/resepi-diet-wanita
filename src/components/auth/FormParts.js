"use client";

import { useState } from "react";

// Medan input berlabel
export function Field({ label, id, type = "text", ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-cocoa-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={isPassword && show ? "text" : type}
          className="w-full rounded-2xl border border-cream-200 bg-cream-50 px-4 py-3 text-cocoa-900 outline-none transition placeholder:text-cocoa-500/60 focus:border-blush-300 focus:bg-white focus:ring-4 focus:ring-blush-100"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-xs font-medium text-cocoa-500 hover:text-blush-600"
          >
            {show ? "Sembunyi" : "Tunjuk"}
          </button>
        )}
      </div>
    </div>
  );
}

// Butang hantar dengan keadaan "sedang memproses"
export function SubmitButton({ loading, children, loadingText = "Sila tunggu..." }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-full bg-blush-500 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blush-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? loadingText : children}
    </button>
  );
}

// Kotak mesej ralat / berjaya
export function Alert({ type = "error", children }) {
  if (!children) return null;
  const styles =
    type === "error"
      ? "border-blush-200 bg-blush-50 text-blush-700"
      : "border-sage-200 bg-sage-50 text-sage-700";
  return (
    <p role="alert" className={`rounded-2xl border px-4 py-3 text-sm ${styles}`}>
      {children}
    </p>
  );
}
