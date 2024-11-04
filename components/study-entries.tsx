"use client";

import { format } from "date-fns";
import { BarChart, Clock, Edit2, Trash2 } from "lucide-react";
import { StudyEntry } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StudyForm } from "./study-form";

interface StudyEntriesProps {
  entries: StudyEntry[];
  onUpdate: (id: string, data: any) => void;
  onDelete: (id: string) => void;
}

export function StudyEntries({ entries, onUpdate, onDelete }: StudyEntriesProps) {
  const getMoodEmoji = (mood: number) => {
    switch (mood) {
      case 1: return "😔"; // Muy Bajo
      case 2: return "🙁"; // Bajo
      case 3: return "😐"; // Neutral
      case 4: return "🙂"; // Bueno
      case 5: return "😊"; // Excelente
      case 6: return "😃"; // Feliz
      case 7: return "😄"; // Muy Feliz
      case 8: return "😁"; // Sonriente
      case 9: return "😍"; // Enamorado
      case 10: return "🥳"; // Fiesta
      default: return "😐"; // Neutral
    }
  };

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{entry.topic}</CardTitle>
                <CardDescription>
                  {format(new Date(entry.created_at), "PPP")}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Editar Sesión de Estudio</DialogTitle>
                      <DialogDescription>
                        Actualiza los detalles de tu sesión de estudio
                      </DialogDescription>
                    </DialogHeader>
                    <StudyForm
                      initialData={entry}
                      onSubmit={(data) => onUpdate(entry.id.toString(), data)}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(entry.id.toString())}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{entry.duration} minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  <span>
                    Estado de Ánimo: {getMoodEmoji(entry.mood_before)} {entry.mood_before} → {getMoodEmoji(entry.mood_after)} {entry.mood_after}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Pensamientos y Sentimientos</h4>
                <p className="text-sm text-muted-foreground">{entry.thoughts}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Desafíos</h4>
                <p className="text-sm text-muted-foreground">{entry.challenges}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Refuerzo positivo</h4>
                <p className="text-sm text-muted-foreground">{entry.solutions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}