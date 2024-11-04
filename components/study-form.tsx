"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StudyEntryFormData } from "@/lib/types";
import { useState, useEffect } from "react";

const formSchema = z.object({
  topic: z.string().min(2, "El tema debe tener al menos 2 caracteres"),
  duration: z.number().min(1, "La duración debe ser de al menos 1 minuto"),
  mood_before: z.number().min(1).max(10),
  mood_after: z.number().min(1).max(10),
  thoughts: z.string(),
  strategies: z.array(z.string()),
  challenges: z.string(),
  solutions: z.string(),
});

interface StudyFormProps {
  onSubmit: (data: StudyEntryFormData) => void;
  initialData?: Partial<StudyEntryFormData>;
}

export function StudyForm({ onSubmit, initialData }: StudyFormProps) {
  const [timeLeft, setTimeLeft] = useState(initialData?.duration ? initialData.duration * 60 : 30 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      alert("Pomodoro session completed!");
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(form.getValues("duration") * 60);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const form = useForm<StudyEntryFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: initialData?.topic || "",
      duration: initialData?.duration || 30,
      mood_before: initialData?.mood_before || 3,
      mood_after: initialData?.mood_after || 3,
      thoughts: initialData?.thoughts || "",
      strategies: initialData?.strategies || [],
      challenges: initialData?.challenges || "",
      solutions: initialData?.solutions || "",
    },
  });

  const handleDurationChange = (value: number) => {
    form.setValue("duration", value);
    setTimeLeft(value * 60);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Registrar Sesión de Estudio</CardTitle>
        <CardDescription>Registra tu viaje de aprendizaje con insights cognitivos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span>Pomodoro Timer: {formatTime(timeLeft)}</span>
          <div>
            <Button onClick={toggleTimer} className="mr-2">
              {isRunning ? "Pausar" : "Iniciar"}
            </Button>
            <Button onClick={resetTimer}>
              Reiniciar
            </Button>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tema de Estudio</FormLabel>
                  <FormControl>
                    <Input placeholder="p. ej., Hooks de React" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duración (minutos)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={e => handleDurationChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mood_before"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado de Ánimo Antes</FormLabel>
                    <Select onValueChange={v => field.onChange(parseInt(v))} defaultValue={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado de ánimo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                          <SelectItem key={value} value={value.toString()}>
                            {value === 1 ? "😔" :
                             value === 2 ? "🙁" :
                             value === 3 ? "😐" :
                             value === 4 ? "🙂" :
                             value === 5 ? "😊" :
                             value === 6 ? "😃" :
                             value === 7 ? "😄" :
                             value === 8 ? "😁" :
                             value === 9 ? "😍" :
                             value === 10 ? "🥳" : "😐"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mood_after"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado de Ánimo Después</FormLabel>
                    <Select onValueChange={v => field.onChange(parseInt(v))} defaultValue={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado de ánimo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                          <SelectItem key={value} value={value.toString()}>
                            {value === 1 ? "😔" :
                             value === 2 ? "🙁" :
                             value === 3 ? "😐" :
                             value === 4 ? "🙂" :
                             value === 5 ? "😊" :
                             value === 6 ? "😃" :
                             value === 7 ? "😄" :
                             value === 8 ? "😁" :
                             value === 9 ? "😍" :
                             value === 10 ? "🥳" : "😐"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="thoughts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pensamientos y Sentimientos</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="¿Cómo te sentiste durante la sesión de estudio?"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="challenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desafíos Encontrados</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="¿Qué dificultades enfrentaste?"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="solutions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Refuerzo positivo</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="¿Qué aprendí en esta sesión?"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Guardar Entrada
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}