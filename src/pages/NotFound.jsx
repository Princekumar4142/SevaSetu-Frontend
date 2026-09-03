import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-md text-center px-margin-mobile">
      <span className="material-symbols-outlined text-outline-variant text-[64px]">search_off</span>
      <h1 className="font-headline-lg text-headline-lg text-primary">Page not found</h1>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="text-primary font-label-md text-label-md font-bold hover:underline">
        Back to home
      </Link>
    </div>
  );
}
