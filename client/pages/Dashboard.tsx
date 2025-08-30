import { SiteLayout } from "@/components/layout/SiteLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, BrainCircuit, Rocket, Target, Zap } from "lucide-react";

export default function Dashboard() {
  return (
    <SiteLayout>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">Your personalized STEM learning hub</p>
        </div>
        <Button asChild size="lg"><Link to="/library">Browse Library</Link></Button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-5 w-5 text-primary" /> Learning Path</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Grade 6 • Physics Basics</span>
                  <span className="text-muted-foreground">60%</span>
                </div>
                <Progress value={60} />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Math • Fractions & Ratios</span>
                  <span className="text-muted-foreground">40%</span>
                </div>
                <Progress value={40} />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Coding • Scratch to Python</span>
                  <span className="text-muted-foreground">25%</span>
                </div>
                <Progress value={25} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Achievements</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge className="rounded-full">Quiz Whiz</Badge>
            <Badge variant="secondary" className="rounded-full">Algebra Ace</Badge>
            <Badge variant="outline" className="rounded-full">Physics Pro</Badge>
            <Badge className="rounded-full">Coding Cadet</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Rocket className="h-5 w-5 text-primary" /> New Challenges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-md p-3">
              <div className="text-sm font-medium">Balance the Bridge</div>
              <p className="text-sm text-muted-foreground">Apply forces to build a stable bridge.</p>
              <Button asChild size="sm" className="mt-2"><Link to="/game">Play</Link></Button>
            </div>
            <div className="border rounded-md p-3">
              <div className="text-sm font-medium">Fraction Frenzy</div>
              <p className="text-sm text-muted-foreground">Solve fraction puzzles against the clock.</p>
              <Button asChild size="sm" className="mt-2"><Link to="/game">Play</Link></Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Next Up</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Forces & Motion: Level 3</span>
                  <Button asChild size="sm" variant="secondary"><Link to="/game">Resume</Link></Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Ratios in Real Life</span>
                  <Button asChild size="sm" variant="secondary"><Link to="/game">Start</Link></Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-primary" /> Quick Practice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>3-Minute Math Sprint</span>
                  <Button asChild size="sm" variant="secondary"><Link to="/game">Play</Link></Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Physics Pop Quiz</span>
                  <Button asChild size="sm" variant="secondary"><Link to="/game">Play</Link></Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="recommendations">
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              Based on your progress, we recommend starting "Ratios in Real Life" and continuing "Forces & Motion: Level 3".
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SiteLayout>
  );
}
