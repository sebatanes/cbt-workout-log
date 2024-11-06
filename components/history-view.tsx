"use client";

import { useState, useMemo } from "react";
import { StudyEntry } from "@/lib/types";
import { Timeline } from "./timeline";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar } from "lucide-react";

interface HistoryViewProps {
  entries: StudyEntry[];
}

export function HistoryView({ entries }: HistoryViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "duration" | "improvement" | "mood_before" | "mood_after">("newest");

  const filteredAndSortedEntries = useMemo(() => {
    let filtered = entries.filter((entry) =>
      entry.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.thoughts.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.challenges.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.solutions.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sortBy) {
      case "oldest":
        return filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      case "duration":
        return filtered.sort((a, b) => b.duration - a.duration);
      case "improvement":
        return filtered.sort((a, b) => 
          (b.mood_after - b.mood_before) - (a.mood_after - a.mood_before)
        );
      case "mood_before":
        return filtered.sort((a, b) =>
          (b.mood_before - a.mood_before)
        );
      case "mood_after":
        return filtered.sort((a, b) =>
          (b.mood_after - a.mood_after)
        );
      default: // newest
        return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  }, [entries, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar entradas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Más Nuevos Primero</SelectItem>
            <SelectItem value="oldest">Más Antiguos Primero</SelectItem>
            <SelectItem value="duration">Duración</SelectItem>
            <SelectItem value="improvement">Más Mejorados</SelectItem>
            <SelectItem value="mood_before">Estado Antes (Alto a Bajo)</SelectItem>
            <SelectItem value="mood_after">Estado Después (Alto a Bajo)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredAndSortedEntries.length > 0 ? (
        <Timeline entries={filteredAndSortedEntries} />
      ) : (
        <div className="flex h-[400px] items-center justify-center text-center">
          <div className="max-w-md space-y-2">
            <h3 className="text-lg font-semibold">No se encontraron entradas</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery
                ? "Intenta ajustar tus términos de búsqueda"
                : "Comienza agregando tu primera sesión de estudio"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}