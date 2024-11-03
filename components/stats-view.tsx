"use client";

import { useMemo } from "react";
import { StudyEntry } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Clock, TrendingUp, Lightbulb } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface StatsViewProps {
  entries: StudyEntry[];
}

export function StatsView({ entries }: StatsViewProps) {
  const stats = useMemo(() => {
    const totalTime = entries.reduce((acc, entry) => acc + entry.duration, 0);
    const avgMoodImprovement =
      entries.reduce(
        (acc, entry) => acc + (entry.mood_after - entry.mood_before),
        0
      ) / entries.length;

    const moodData = entries
      .slice()
      .reverse()
      .map((entry) => ({
        date: new Date(entry.created_at).toLocaleString(),
        moodDifference: entry.mood_after - entry.mood_before,
      }));

    return {
      totalSessions: entries.length,
      totalTime,
      avgMoodImprovement,
      moodData,
    };
  }, [entries]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Sesiones</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSessions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Total</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTime} min</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cambio Promedio de Ánimo</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.avgMoodImprovement > 0 ? "+" : ""}
              {stats.avgMoodImprovement.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perspectivas</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.avgMoodImprovement > 0 ? "📈 Mejorando" : "🎯 Sigue Adelante"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Tendencias de Ánimo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.moodData}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Bar dataKey="moodDifference" fill="#FFF" name="Diferencia de Ánimo" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
