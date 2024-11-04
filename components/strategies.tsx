import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, BookOpen, ListChecks } from 'lucide-react';

// Text content stored in an array
const strategiesContent = [
  {
    title: "Estrategias de Aprendizaje",
    buttonLabel: "Cursos de Udemy",
    description: "Si tenés que estar viendo el video y escribiendo código al mismo tiempo, podés probar una mezcla de <em>active recall</em> y \"aprender haciendo\" para mantener la cabeza ocupada y recordar mejor lo que vas viendo:",
    items: [
      {
        title: "Dividilo en partes y alterná",
        content: "Mirá una sección corta del video (unos 3 a 5 minutos), pausá, y tratá de aplicar lo que aprendiste escribiendo el código sin ver la solución en pantalla. Esto te obliga a recordar, en lugar de mirar el video de manera pasiva."
      },
      {
        title: "Hacé pausas para practicar",
        content: "Cada vez que el instructor explique algo importante, pausá el video y escribí en un archivo de notas una pregunta sobre ese concepto (por ejemplo, \"¿Cómo uso el useState?\"). Después, intentá escribir el código sin mirar el video de nuevo. Así estás activamente recordando en vez de solo consumir la info."
      },
      {
        title: "Probá el método \"mirá pero no toques\"",
        content: "Observá al instructor escribir el código sin hacer nada en tu compu. Prestá atención a la lógica y a los pasos. Después, sin volver atrás en el video, tratá de escribir vos mismo el código desde el principio, solo usando lo que te acordás. Es una manera de ejercitar la memoria también."
      },
      {
        title: "Inventá ejemplos propios",
        content: "Si hay algo que te parece especialmente aburrido o difícil, inventá un ejemplo rápido y probalo en código, aunque sea algo sencillo y fuera del curso. Le das tu toque personal y hace que el contenido tenga un poco más de sentido."
      },
      {
        title: "Escribí un mini resumen después de cada módulo",
        content: "Cuando termines una parte, intentá explicarlo en un par de oraciones. Así reforzás lo que aprendiste y además te queda un material de repaso rápido para cuando necesites."
      }
    ]
  },
  {
    title: "Estrategias de Aprendizaje y Manejo de Ansiedad",
    buttonLabel: "Estrategias Cognitivas",
    description: "Frases para reducir la ansiedad al estudiar y descatastrofizar el no conseguir un trabajo:",
    items: [
      {
        title: "Reducir ansiedad al estudiar",
        content: [
          "Es normal sentirme nervioso, pero estos nervios no definen mi capacidad para aprender.",
          "Estoy avanzando a mi propio ritmo, y cada sesión de estudio es un paso adelante.",
          "Si hoy no entiendo algo, está bien. Puedo volver a ello y aprenderlo poco a poco.",
          "La perfección no es el objetivo, sino el progreso constante.",
          "Puedo darme permiso para descansar y volver con más energía y claridad."
        ]
      },
      {
        title: "Hacer tai chi",
        content: "Practicar tai chi para relajarme y mejorar mi concentración."
      },
      {
        title: "Descatastrofizar si no conseguís el trabajo deseado",
        content: [
          "No conseguir este trabajo no define mi valor ni mis habilidades.",
          "Este trabajo es una oportunidad, pero hay muchas otras que también pueden enriquecer mi carrera.",
          "Cada rechazo es solo un paso hacia una nueva oportunidad. Seguiré buscando y mejorando.",
          "Tengo habilidades y cualidades que seguirán siendo valiosas, aunque no sea en esta empresa en particular.",
          "La búsqueda de trabajo puede llevar tiempo, y eso está bien. Cada experiencia es una oportunidad para crecer."
        ]
      }
    ]
  }
];

export const Strategies: React.FC = () => {
  const [openStates, setOpenStates] = useState<boolean[]>(new Array(strategiesContent.length).fill(false));

  const toggle = (index: number) => {
    setOpenStates(prev => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <>
      {strategiesContent.map((strategy, index) => (
        <Card key={index} className="border mb-4  rounded-lg shadow-lg text-gray-100">
          <CardHeader className="border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-gray-300" />
                <CardTitle className="text-lg font-semibold">{strategy.title}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <Collapsible open={openStates[index]}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => toggle(index)}
                aria-expanded={openStates[index]}
                className="flex items-center gap-1 text-gray-300"
              >
                {openStates[index] ? <ChevronDown /> : <ChevronRight />}
                <span>{strategy.buttonLabel}</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="transition-all duration-300 ease-in-out p-4">
              <CardContent className="space-y-4 border-t  pt-4">
                <CardDescription dangerouslySetInnerHTML={{ __html: strategy.description }} />
                <div className="grid gap-4">
                  {strategy.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3">
                      <ListChecks className="h-5 w-5 text-gray-300" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        {Array.isArray(item.content) ? (
                          <ul className="text-sm text-gray-400 space-y-2">
                            {item.content.map((text, textIndex) => (
                              <li key={textIndex}>{text}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-400">{item.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </>
  );
};
