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
  Legend,
} from "recharts";

interface StatsViewProps {
  entries: StudyEntry[];
}

export function StatsView({ entries }: StatsViewProps) {
  const stats = useMemo(() => {
    let points = 0;
    let role = "Bronce"; // Rol por defecto

    entries.forEach(entry => {
      if (entry.mood_after > entry.mood_before) {
        points += 10; // Ganas 10 puntos si mejoraste tu estado de ánimo
      }
      if (entry.mood_after > 9) {
        points += 5; // Ganas 5 puntos si tu estado de ánimo fue más de 9
      }
    });

    if (points > 200) {
      role = "Diamante";
    } else if (points >= 100) {
      role = "Oro";
    } else if (points >= 50) {
      role = "Plata";
    }

    const totalTime = entries.reduce((acc, entry) => acc + entry.duration, 0);
    const hours = Math.floor(totalTime / 60);
    const minutes = totalTime % 60;
    const avgMoodImprovement =
      entries.reduce(
        (acc, entry) => acc + (entry.mood_after - entry.mood_before),
        0
      ) / entries.length;

    const moodData = entries
      .slice()
      .reverse()
      .map((entry, index) => ({
        date: new Date(entry.created_at).toLocaleString(),
        moodStart: entry.mood_before,
        moodEnd: entry.mood_after,
      }));

    return {
      totalSessions: entries.length,
      totalTime: { hours, minutes },
      avgMoodImprovement,
      moodData,
      points,
      role,
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
            <div className="text-2xl font-bold">
              {stats.totalTime.hours}h {stats.totalTime.minutes}m
            </div>
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

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntos Acumulados</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              <span>{stats.points}</span>
              {stats.points >= 50 && <span className="ml-2 text-green-500">🏆</span>}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rol Actual</CardTitle>
            {stats.role === "Diamante" && <Lightbulb className="h-4 w-4 text-yellow-500" />}
            {stats.role === "Oro" && <Lightbulb className="h-4 w-4 text-yellow-400" />}
            {stats.role === "Plata" && <Lightbulb className="h-4 w-4 text-gray-400" />}
            {stats.role === "Bronce" && <Lightbulb className="h-4 w-4 text-brown-400" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              {stats.role === "Diamante" && <span className="mr-2 text-yellow-500">💎</span>}
              {stats.role === "Oro" && <span className="mr-2 text-yellow-400">🥇</span>}
              {stats.role === "Plata" && <span className="mr-2 text-gray-400">🥈</span>}
              {stats.role === "Bronce" && <span className="mr-2 text-brown-400">🥉</span>}
              <span>{stats.role}</span>
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
                <Bar dataKey="moodStart" fill="rgba(255, 255, 255, 0.8)" name="Ánimo al Inicio" />
                <Bar dataKey="moodEnd" fill="rgba(128, 0, 128, 0.8)" name="Ánimo al Final" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
