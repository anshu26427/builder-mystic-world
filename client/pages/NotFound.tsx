import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { SiteLayout } from "@/components/layout/SiteLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-sky-500">
          404
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Oops! Page not found
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Return to Home
        </a>
      </div>
    </SiteLayout>
  );
};

export default NotFound;
