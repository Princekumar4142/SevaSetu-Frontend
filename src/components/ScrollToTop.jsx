import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Universal ScrollToTop component:
 * Automatically resets window, html, and body scroll position to (0, 0)
 * on every route change across the entire application.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If navigating with a specific anchor hash (e.g. #services, #about)
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // Otherwise always reset scroll to the very top immediately
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search, hash]);

  return null;
}
