/**
 * Avatar Component with Image Support & Initial Fallback
 */
export default function Avatar({ src, name, size = "md", className = "" }) {
  const sizeClasses = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
    xl: "w-20 h-20 text-2xl",
    "2xl": "w-24 h-24 text-3xl",
  };

  const initial = name ? name.trim().charAt(0).toUpperCase() : "?";

  if (src && src.trim()) {
    return (
      <img
        src={src}
        alt={name || "User Avatar"}
        className={`rounded-full object-cover shrink-0 shadow-sm border-2 border-white ${sizeClasses[size] || sizeClasses.md} ${className}`}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 text-white font-extrabold flex items-center justify-center shrink-0 shadow-sm border-2 border-white ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      {initial}
    </div>
  );
}
