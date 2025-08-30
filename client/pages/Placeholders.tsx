import { SiteLayout } from "@/components/layout/SiteLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { BookOpen, Filter, Gamepad2, Search, Timer, Trophy, Users } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Bar, BarChart } from "recharts";

// ---------------- Library ----------------
const CONTENT = [
  { id: "physics-bridge", title: "Balance the Bridge", subject: "Physics", grade: "6", duration: 15, difficulty: "Medium", tags: ["forces", "engineering"], description: "Apply forces to build a stable bridge." },
  { id: "math-fractions", title: "Fraction Frenzy", subject: "Math", grade: "5", duration: 10, difficulty: "Easy", tags: ["fractions"], description: "Solve fraction puzzles against the clock." },
  { id: "coding-scratch", title: "Scratch to Python", subject: "Coding", grade: "6", duration: 20, difficulty: "Medium", tags: ["logic", "variables"], description: "Transition from blocks to Python basics." },
  { id: "chemistry-states", title: "States of Matter", subject: "Chemistry", grade: "7", duration: 12, difficulty: "Easy", tags: ["matter"], description: "Classify solids, liquids, and gases with mini-games." },
  { id: "bio-ecosystems", title: "Ecosystem Explorer", subject: "Biology", grade: "6", duration: 18, difficulty: "Medium", tags: ["food web"], description: "Balance a food web and keep your biome alive." },
  { id: "math-ratios", title: "Ratios in Real Life", subject: "Math", grade: "6", duration: 15, difficulty: "Medium", tags: ["ratios"], description: "Use ratios to solve real-world scenarios." },
];

export function LibraryPage() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState<string>("all");
  const [grade, setGrade] = useState<string>("all");

  const results = useMemo(() => {
    return CONTENT.filter((c) =>
      (subject === "all" || c.subject === subject) &&
      (grade === "all" || c.grade === grade) &&
      (query.trim() === "" ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
    );
  }, [query, subject, grade]);

  return (
    <SiteLayout>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">STEM Content Library</h1>
          <p className="text-muted-foreground">Browse topics, games, and modules by subject and grade level</p>
        </div>
        <Button asChild><Link to="/dashboard">Back to Dashboard</Link></Button>
      </div>

      <Card className="mt-6">
        <CardContent className="p-6 grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <Label htmlFor="search" className="sr-only">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="search" placeholder="Search topics, tags, or modules" className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className="w-full"><Filter className="mr-2 h-4 w-4 opacity-60" /> <SelectValue placeholder="Subject" /></SelectTrigger>
            <SelectContent>
              {"all,Math,Physics,Chemistry,Biology,Coding".split(",").map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger className="w-full"><Users className="mr-2 h-4 w-4 opacity-60" /> <SelectValue placeholder="Grade" /></SelectTrigger>
            <SelectContent>
              {["all","5","6","7"].map((g) => (
                <SelectItem key={g} value={g}>Grade {g === "all" ? "All" : g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {results.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2">
                <span className="truncate">{c.title}</span>
                <Badge className="rounded-full">{c.subject}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{c.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Timer className="h-3.5 w-3.5" /> {c.duration}m</span>
                <span>Difficulty: {c.difficulty}</span>
                <span>Grade {c.grade}</span>
                {c.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Button asChild><Link to={`/game?id=${c.id}`}>Start Quest</Link></Button>
                <Button variant="secondary" asChild><Link to="/progress">View Progress</Link></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {results.length === 0 && (
          <Card className="md:col-span-3"><CardContent className="p-8 text-center text-muted-foreground">No results. Try a different search or filter.</CardContent></Card>
        )}
      </div>
    </SiteLayout>
  );
}

// ---------------- Game (interactive quiz) ----------------
const QUESTIONS = [
  { id: 1, q: "A bridge stays up because forces are...", options: ["Unbalanced", "Balanced", "Random"], answer: 1 },
  { id: 2, q: "What is 3/4 + 1/4?", options: ["1/2", "1", "2/4"], answer: 1 },
  { id: 3, q: "A variable in code is best described as...", options: ["A fixed number", "A container for values", "A math operation"], answer: 1 },
];

export function GamePage() {
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const current = QUESTIONS[step];
  const progress = Math.round((step / QUESTIONS.length) * 100);

  function submit() {
    if (choice === null) return;
    if (choice === current.answer) setScore((s) => s + 1);
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1);
      setChoice(null);
    } else {
      setStep((s) => s + 1); // finish state
    }
  }

  const finished = step >= QUESTIONS.length;

  return (
    <SiteLayout>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Interactive Game</h1>
          <p className="text-muted-foreground">Answer questions and earn badges</p>
        </div>
        <Button asChild variant="secondary"><Link to="/library">Back to Library</Link></Button>
      </div>

      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Gamepad2 className="h-4 w-4" /> Quiz Mode</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Trophy className="h-4 w-4" /> Score {score}/{QUESTIONS.length}</div>
          </div>
          <Progress className="mt-4" value={finished ? 100 : progress} />

          {!finished ? (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">{current.q}</h2>
              <div className="mt-4 grid gap-3">
                {current.options.map((opt, i) => (
                  <Button key={i} variant={choice === i ? "default" : "secondary"} onClick={() => setChoice(i)} className="justify-start">
                    {opt}
                  </Button>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Button onClick={submit} disabled={choice === null}>Check Answer</Button>
                <Button variant="outline" onClick={() => setChoice(null)} disabled={choice === null}>Clear</Button>
              </div>
            </div>
          ) : (
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold">Great job!</h2>
              <p className="text-muted-foreground">You scored {score} out of {QUESTIONS.length}.</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <Badge className="rounded-full">Quiz Whiz</Badge>
                {score === QUESTIONS.length && <Badge variant="secondary" className="rounded-full">Perfect!</Badge>}
              </div>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button asChild><Link to="/progress">View Progress</Link></Button>
                <Button asChild variant="secondary"><Link to="/game">Play Again</Link></Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </SiteLayout>
  );
}

// ---------------- Progress & Achievements ----------------
const WEEKLY = [
  { day: "Mon", minutes: 20, accuracy: 80 },
  { day: "Tue", minutes: 15, accuracy: 60 },
  { day: "Wed", minutes: 30, accuracy: 85 },
  { day: "Thu", minutes: 25, accuracy: 70 },
  { day: "Fri", minutes: 35, accuracy: 90 },
  { day: "Sat", minutes: 10, accuracy: 50 },
  { day: "Sun", minutes: 0, accuracy: 0 },
];

export function ProgressPage() {
  return (
    <SiteLayout>
      <h1 className="text-2xl font-bold tracking-tight">Progress & Achievements</h1>
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Weekly Learning Minutes</CardTitle></CardHeader>
              <CardContent>
                <ChartContainer
                  config={{ minutes: { label: "Minutes", color: "hsl(var(--primary))" } }}
                >
                  <BarChart data={WEEKLY}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Bar dataKey="minutes" fill="var(--color-minutes)" radius={4} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Quiz Accuracy</CardTitle></CardHeader>
              <CardContent>
                <ChartContainer
                  config={{ accuracy: { label: "Accuracy %", color: "hsl(var(--accent))" } }}
                >
                  <LineChart data={WEEKLY}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Line type="monotone" dataKey="accuracy" stroke="var(--color-accuracy)" strokeWidth={2} dot={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="details">
          <Card>
            <CardHeader><CardTitle>Completed Quests</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Your recent learning activity</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { title: "Forces & Motion: Level 3", subject: "Physics", score: 92 },
                    { title: "Ratios in Real Life", subject: "Math", score: 88 },
                    { title: "Scratch to Python", subject: "Coding", score: 75 },
                  ].map((r) => (
                    <TableRow key={r.title}>
                      <TableCell className="font-medium">{r.title}</TableCell>
                      <TableCell>{r.subject}</TableCell>
                      <TableCell className="text-right">{r.score}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex items-center gap-2">
        <Badge className="rounded-full">Quiz Whiz</Badge>
        <Badge variant="secondary" className="rounded-full">Algebra Ace</Badge>
        <Badge variant="outline" className="rounded-full">Physics Pro</Badge>
      </div>
    </SiteLayout>
  );
}

// ---------------- Teacher/Admin Dashboard ----------------
export function AdminPage() {
  return (
    <SiteLayout>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teacher/Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor student progress, assign content, and manage users</p>
        </div>
        <Button asChild><Link to="/library">Assign Content</Link></Button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Class Overview</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between"><span>Students</span><span className="font-medium">24</span></div>
            <div className="flex items-center justify-between"><span>Average Score</span><span className="font-medium">82%</span></div>
            <div className="flex items-center justify-between"><span>Active Quests</span><span className="font-medium">7</span></div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Students</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Current Quest</TableHead>
                  <TableHead className="text-right">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "Ava Patel", grade: 6, quest: "Forces & Motion", progress: 60 },
                  { name: "Liam Chen", grade: 6, quest: "Ratios in Real Life", progress: 40 },
                  { name: "Mia Garcia", grade: 5, quest: "Fraction Frenzy", progress: 80 },
                ].map((s) => (
                  <TableRow key={s.name}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>Grade {s.grade}</TableCell>
                    <TableCell>{s.quest}</TableCell>
                    <TableCell className="text-right w-[220px]">
                      <Progress value={s.progress} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /> Assign Content</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div>
            <Label>Group</Label>
            <Select defaultValue="g6">
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="g5">Grade 5</SelectItem>
                <SelectItem value="g6">Grade 6</SelectItem>
                <SelectItem value="g7">Grade 7</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Module</Label>
            <Select defaultValue="ratios">
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="forces">Forces & Motion</SelectItem>
                <SelectItem value="ratios">Ratios in Real Life</SelectItem>
                <SelectItem value="fractions">Fraction Frenzy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button className="w-full">Assign Now</Button>
          </div>
        </CardContent>
      </Card>
    </SiteLayout>
  );
}
