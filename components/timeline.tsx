"use client";

import { format } from "date-fns";
import { StudyEntry } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BookOpen, Clock, Target, Lightbulb, ArrowRight } from "lucide-react";

interface TimelineProps {
  entries: StudyEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  const getIcon = (index: number) => {
    const icons = [BookOpen, Target, Lightbulb];
    return icons[index % icons.length];
  };

  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-background before:via-muted before:to-background">
      {entries.map((entry, index) => {
        const Icon = getIcon(index);
        const date = new Date(entry.created_at);
        const isToday = new Date().toDateString() === date.toDateString();

        return (
          <div key={entry.id} className="relative flex items-start gap-6 pl-[52px]">
            <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Icon className="h-5 w-5" />
            </div>
            <Card className={cn(
              "w-full p-4 transition-all hover:shadow-lg",
              isToday && "border-primary"
            )}>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {format(date, "PPP")}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{entry.duration}m</span>
                  </div>
                </div>
                <h4 className="font-semibold">{entry.topic}</h4>
                <div className="flex items-center gap-2 text-sm">
                  <span>Mood</span>
                  <span className="text-muted-foreground">{entry.mood_before} {getMoodEmoji(entry.mood_before)}</span>
                  <ArrowRight className="h-3 w-3" />
                  <span className="text-muted-foreground">{entry.mood_after} {getMoodEmoji(entry.mood_after)}</span>
                </div>
                {entry.thoughts && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {entry.thoughts}
                  </p>
                )}
                {entry.challenges && (
                  <div className="flex gap-2 text-sm">
                    <span className="font-medium">Challenge:</span>
                    <span className="text-muted-foreground line-clamp-1">
                      {entry.challenges}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

function getMoodEmoji(mood: number) {
  switch (mood) {
    case 1: return "😔";
    case 2: return "🙁";
    case 3: return "😐";
    case 4: return "🙂";
    case 5: return "😊";
    default: return "😐";
  }
}