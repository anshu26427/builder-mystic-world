import { PropsWithChildren } from "react";
import { SiteHeader } from "./SiteHeader";

export function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="container py-8">{children}</main>
      <footer className="border-t mt-12">
        <div className="container py-6 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} STEM Quest. All rights reserved.</p>
          <p className="opacity-80">Learn through play: Science • Technology • Engineering • Math</p>
        </div>
      </footer>
    </div>
  );
}
