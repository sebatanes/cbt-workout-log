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
import { FaTrophy } from 'react-icons/fa';

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
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [timer, setTimer] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [customTime, setCustomTime] = useState(25);

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
  };

  const handleSubmit = (data: StudyEntryFormData) => {
    setShowCongratulations(true);
    setTimeout(() => {
      setShowCongratulations(false);
      onSubmit(data);
    }, 5000);
  };

  const positiveMessages = [
    "¡Guardaste tu entrada con éxito, genio!",
    "¡Sos un capo por dedicar tiempo a tu aprendizaje!",
    "¡A celebrar tus logros, cada paso cuenta!",
    "¡Dale que va, el esfuerzo vale la pena!",
    "¡Acordate de felicitarte en voz alta, vos te lo merecés!",
    "¡Estás avanzando a lo grande, seguí así!",
    "¡Sos un crack por no bajar los brazos!",
    "¡Cada día estás más cerca de tus metas, qué fenómeno!",
    "¡Muy bien, seguí sumando esfuerzo, campeón!",
    "¡Qué orgullo verte progresar, no pares!",
    "¡Tu dedicación es inspiradora, a seguir metiéndole!",
    "¡Mirá lo lejos que llegaste, seguilo disfrutando!",
    "¡Sos un ejemplo de constancia, seguí así!",
    "¡Vas a lograr cosas grandes, seguí así!",
    "¡Cada pequeño avance suma, no te detengas!",
    "¡Tus ganas son contagiosas, hacés que valga la pena!",
    "¡Todo el esfuerzo está dando frutos, no aflojes!",
    "¡Estás demostrando lo que valés, qué orgullo!",
    "¡Es increíble lo que estás logrando, vamos viejo!",
    "¡Cada día es una nueva oportunidad para aprender!",
    "¡Tu esfuerzo está dando resultados, sigue así!",
    "¡Eres un ejemplo de perseverancia, no te rindas!",
    "¡Cada paso que das te acerca más a tus sueños!",
    "¡Estás construyendo un futuro brillante, sigue adelante!",
    "¡Cada logro, por pequeño que sea, cuenta!",
    "¡Tu compromiso es inspirador, sigue así!",
    "¡Estás haciendo un gran trabajo, no te detengas!",
    "Tu esfuerzo y dedicación son dignos de reconocimiento!"
  ];



  const randomMessage = positiveMessages[Math.floor(Math.random() * positiveMessages.length)];

  useEffect(() => {
    document.title = `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`;
    
    if (isActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsActive(false);
      setShowCongratulations(true);
      setTimeout(() => {
        setShowCongratulations(false);
        onSubmit(form.getValues());
      }, 5000);
    }
  }, [isActive, timer]);

  const startTimer = () => {
    setTimer(customTime * 60);
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimer(customTime * 60);
  };

  return (
    <div className="flex space-x-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Registrar Sesión de Estudio</CardTitle>
          <CardDescription>Registra tu viaje de aprendizaje con insights cognitivos </CardDescription>
        </CardHeader>
        <CardContent>
          {showCongratulations && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90 animate-fade-in-out">
              <div className="bg-black rounded-lg shadow-lg p-8 text-center relative">
                <div className="absolute top-0 left-0 right-0 -mt-6">
                  <FaTrophy className="mx-auto w-16 h-16 text-yellow-500" />
                </div>
                <h1 className="text-5xl font-bold text-white">¡Felicidades!</h1>
                <p className="text-lg text-gray-300 mt-2">{randomMessage}</p>
                <h3 className="text-md text-gray-400 mt-4">¡Acordate de felicitarte en voz alta, vos te lo merecés!</h3>
              </div>
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                                                value === 10 ? "🥳" : "😐"} {value}
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
                                                value === 10 ? "🥳" : "😐"} {value}
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
                        placeholder="Pensamientos negativos o desmotivadores que surgieron"
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
                        placeholder="¿Qué aprendí en esta sesión? ¿Qué hice bien? ¿Qué fue lo mejor de esta sesión?"
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

      <Card className="w-1/3 border-none">
        <CardHeader>
          <CardTitle>Temporizador</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <h2 className="text-4xl font-bold">
            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </h2>
          <p className="mt-2 text-lg">{isActive ? "En curso" : "Detenido"}</p>

          <div className="flex items-center justify-center mt-4">
            <input
              type="number"
              value={customTime}
              onChange={e => setCustomTime(parseInt(e.target.value))}
              min={1}
              className="border rounded p-2 w-20 text-center"
            />
            <span className="ml-2">minutos</span>
          </div>

          <Button onClick={startTimer} className="w-full mt-2">
            Iniciar
          </Button>
          <Button onClick={stopTimer} className="w-full mt-2" disabled={!isActive}>
            Detener
          </Button>
          <Button onClick={resetTimer} className="w-full mt-2">
            Reiniciar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}