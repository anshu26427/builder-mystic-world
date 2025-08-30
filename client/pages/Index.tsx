import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";

import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Gamepad2, Globe2, Sparkles, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "hi", name: "हिंदी" },
  { code: "zh", name: "中文" },
];

export default function Index() {
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
    <SiteLayout>
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-violet-600 to-sky-500 px-6 py-16 sm:px-12 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(800px_400px_at_0%_0%,white,transparent),radial-gradient(800px_400px_at_100%_100%,white,transparent)]" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20">
            <Sparkles className="h-3.5 w-3.5" />
            Learn STEM through play
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
            A gamified STEM platform for curious minds
          </h1>
          <p className="mt-4 text-white/90 text-lg">
            Personalized learning paths, interactive games, and real-time progress tracking for students and educators.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="shadow-lg">
              <Link to="/dashboard">
                <Gamepad2 className="mr-2 h-5 w-5" />
                Start Learning
              </Link>
            </Button>
            <Select value={lang} onValueChange={handleLangChange}>
              <SelectTrigger className="w-[200px] bg-white/90 text-foreground">
                <Globe2 className="mr-2 h-4 w-4 opacity-70" />
                <SelectValue placeholder="Choose language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((l) => (
                  <SelectItem key={l.code} value={l.code}>{l.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Personalized Paths",
            desc: "Adaptive learning tailored to grade and skill level.",
          },
          { title: "Interactive Games", desc: "Puzzles, quests, and quizzes that make learning fun." },
          { title: "Secure & Safe", desc: "Privacy-first design built for classrooms and families." },
        ].map((f, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-2 items-stretch">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold">Getting started</h3>
            <ol className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2"><span className="mt-1 h-5 w-5 grid place-content-center rounded-full bg-secondary">1</span> Choose your language and grade level</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-5 w-5 grid place-content-center rounded-full bg-secondary">2</span> Explore the STEM library and pick a quest</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-5 w-5 grid place-content-center rounded-full bg-secondary">3</span> Play interactive games and earn badges</li>
            </ol>
            <Button asChild className="mt-6"><Link to="/dashboard">Go to Dashboard</Link></Button>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-secondary to-secondary/40">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold">For Teachers & Admins</h3>
            <p className="mt-2 text-sm text-muted-foreground">Assign content, monitor progress, and manage your classroom from a single dashboard.</p>
            <Button asChild variant="secondary" className="mt-6"><Link to="/admin">Open Admin Dashboard</Link></Button>
          </CardContent>
        </Card>
      </section>
    </SiteLayout>
  );
}
