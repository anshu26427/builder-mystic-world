import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Placeholder({ title, description }: { title: string; description: string }) {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild><Link to="/dashboard">Go to Dashboard</Link></Button>
          <Button asChild variant="secondary"><Link to="/">Back Home</Link></Button>
        </div>
      </div>
    </SiteLayout>
  );
}

export function LibraryPage() {
  return (
    <Placeholder
      title="STEM Content Library"
      description="Browse subjects, grade levels, games, and learning modules. Ask to generate this page when you're ready."
    />
  );
}

export function GamePage() {
  return (
    <Placeholder
      title="Interactive Game Screen"
      description="Play interactive quests, puzzles, and quizzes. Ask to generate this page when you're ready."
    />
  );
}

export function ProgressPage() {
  return (
    <Placeholder
      title="Progress & Achievements"
      description="View detailed performance, completed quests, badges, and improvement areas. Ask to generate this page when you're ready."
    />
  );
}

export function AdminPage() {
  return (
    <Placeholder
      title="Teacher/Admin Dashboard"
      description="Monitor student progress, assign content, and manage users. Ask to generate this page when you're ready."
    />
  );
}
