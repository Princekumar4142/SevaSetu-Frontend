import { useState } from "react";

export default function Input({ label, error, className = "", type, ...rest }) {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <label className="flex flex-col gap-xs w-full">
      {label && <span className="font-label-md text-label-md text-on-surface">{label}</span>}
      <div className="relative w-full">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={`w-full px-md py-sm rounded-lg border bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            error ? "border-error" : "border-outline-variant"
          } ${isPassword ? "pr-11" : ""} ${className}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-on-surface-variant hover:text-primary transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              // Eye-off icon
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7a9.77 9.77 0 012.197-3.584M6.343 6.343A9.956 9.956 0 0112 5c5 0 9 4 9 7a9.956 9.956 0 01-1.343 2.657M6.343 6.343L3 3m3.343 3.343l11.314 11.314M3 3l18 18" />
              </svg>
            ) : (
              // Eye icon
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && <span className="font-status-badge text-status-badge text-error">{error}</span>}
    </label>
  );
}

