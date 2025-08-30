import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Languages, Trophy, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

const nav = [
  { to: "/#dashboard", label: "Dashboard" },
  { to: "/#library", label: "Library" },
  { to: "/#game", label: "Game" },
  { to: "/#progress", label: "Progress" },
  { to: "/#admin", label: "Admin" },
];

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "hi", name: "हिंदी" },
  { code: "zh", name: "中文" },
];

export function SiteHeader() {
  const { pathname } = useLocation();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const stored = localStorage.getItem("app.lang");
    if (stored) setLang(stored);
  }, []);

  function handleLangChange(value: string) {
    setLang(value);
    localStorage.setItem("app.lang", value);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="inline-flex items-center gap-2 font-extrabold text-lg tracking-tight">
            <span className="grid h-8 w-8 place-content-center rounded-lg bg-gradient-to-br from-violet-600 to-sky-500 text-white">
              <Gamepad2 className="h-5 w-5" />
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-sky-500">STEM Quest</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-4">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to}
                className={({ isActive }) => cn(
                  "px-3 py-2 text-sm rounded-md transition-colors",
                  isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Select value={lang} onValueChange={handleLangChange}>
            <SelectTrigger className="w-[140px]">
              <Languages className="mr-2 h-4 w-4 opacity-70" />
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((l) => (
                <SelectItem key={l.code} value={l.code}>{l.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button asChild variant="default">
            <Link to="/#progress">
              <Trophy className="mr-2 h-4 w-4" />
              My Progress
            </Link>
          </Button>
        </div>
      </div>

      <div className="md:hidden border-t">
        <div className="container py-2 flex flex-wrap gap-2">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} className={cn(
              "px-3 py-1.5 text-sm rounded-md border",
              pathname === item.to ? "bg-secondary" : "hover:bg-secondary"
            )}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
