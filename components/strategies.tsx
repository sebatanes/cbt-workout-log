import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, BookOpen, ListChecks } from 'lucide-react';
// Contenido de estrategias en un array
const strategiesContent = [
  {
    title: "Estrategias de Manejo de Ansiedad",
    buttonLabel: "Estrategias Cognitivas",
    description: "Frases para reducir la ansiedad al ejercitar y desmitificar el miedo a no lograr tus metas:",
    items: [
      {
        title: "Reducir ansiedad al hacer ejercicio",
        content: [
          "Es normal sentir un poco de inseguridad, pero no define mi capacidad para progresar.",
          "Voy avanzando a mi propio ritmo, y cada sesión es un paso adelante en mi camino hacia el bienestar.",
          "Si hoy no puedo completar un ejercicio, está bien. Puedo intentarlo de nuevo en otro momento.",
          "La perfección no es el objetivo, sino un progreso constante y disfrutable.",
          "Puedo darme permiso para descansar y volver con más energía y enfoque."
        ]
      },
      {
        title: "Hacer estiramientos",
        content: "Practicar estiramientos después de cada sesión para relajarme, evitar tensiones y mejorar mi flexibilidad."
      },
      {
        title: "Descatastrofizar si no cumples tus metas de inmediato",
        content: [
          "No lograr este objetivo de inmediato no define mi valor ni mis capacidades.",
          "Este reto es una oportunidad, y cada paso me ayuda a ser mejor y más fuerte.",
          "Cada vez que intento, aunque no logre la meta deseada, es un avance y un aprendizaje.",
          "Mis cualidades y habilidades siguen siendo valiosas, aunque el progreso sea gradual.",
          "Alcanzar objetivos puede tomar tiempo, y eso está bien. Cada experiencia es una oportunidad de crecimiento."
        ]
      }
    ]
  },
  {
    title: "Estrategias para Mantener la Motivación",
    buttonLabel: "Estrategias de Motivación",
    description: "Para seguir motivado y con energía durante tus entrenamientos, incorpora estas estrategias a tu rutina. ¡A darlo todo!",
    items: [
      {
        title: "Escuchar Música Energética",
        content: "Ponte una playlist de música que te motive, con temas que te impulsen a moverte. La música puede elevar tu energía y ánimo, haciéndote disfrutar más de la actividad física."
      },
      {
        title: "Mover el cuerpo, sin excusas",
        content: "No necesitas un gimnasio para activar el cuerpo. Una caminata rápida o algunos estiramientos pueden hacer una gran diferencia. Cuando te mueves, tu motivación aumenta y el estrés disminuye."
      },
      {
        title: "Sonreír durante el ejercicio",
        content: "Sonreír, incluso durante un ejercicio intenso, ayuda a liberar endorfinas, lo que mejora tu ánimo. La sonrisa puede cambiar tu día y hacer que la sesión sea más disfrutable."
      },
      {
        title: "Mantente hidratado",
        content: "No subestimes la importancia de la hidratación. Un cuerpo bien hidratado rinde mejor, tanto en energía como en concentración. ¡Recuerda tomar agua antes, durante y después del ejercicio!"
      },
      {
        title: "Celebrar cada avance",
        content: "Cada logro, por pequeño que sea, es importante. Celebra tus avances para que tu cerebro reconozca que estás en el camino correcto. ¡Cada paso cuenta!"
      },
      {
        title: "Crear una Playlist Energética",
        content: "Crea una lista de reproducción con canciones que te motiven. Escucharla mientras te ejercitas te ayuda a mantener un nivel alto de energía."
      },
      {
        title: "Cambiar tu estado de ánimo rápidamente",
        content: "Si te sientes desmotivado, cambia tu postura, sonríe o simplemente comienza con un movimiento fácil. Estos pequeños cambios físicos pueden ayudarte a reactivar tu energía."
      },
      {
        title: "Hablarte positivamente",
        content: "Habla contigo mismo como un entrenador: ‘¡Puedo hacerlo!’ o ‘¡Estoy avanzando bien!’. Las palabras que usas para hablarte a ti mismo tienen el poder de influir en tu actitud."
      },
      {
        title: "Visualizar el éxito",
        content: "Cierra los ojos y visualízate logrando tus objetivos. Siéntelo como una realidad, y tu cuerpo estará más dispuesto a seguir el camino hacia esa meta."
      },
      {
        title: "Respiración profunda",
        content: "Cuando sientas cansancio o tensión, haz una pausa y respira profundamente. La respiración profunda ayuda a despejar tu mente y renovar tu energía."
      },
    ]
  },
  {
    title: "Estrategias de Aprendizaje y Mejora",
    buttonLabel: "Consejos para Progresar",
    description: "Prueba estas estrategias para mejorar tu enfoque y disfrutar el proceso mientras aprendes nuevas habilidades físicas:",
    items: [
      {
        title: "Divídelo en partes manejables",
        content: "Divide tu entrenamiento en segmentos. Concéntrate en una habilidad o movimiento a la vez. Esto te ayuda a no sentirte abrumado y facilita la constancia."
      },
      {
        title: "Haz pausas para revisar tu técnica",
        content: "Revisa la técnica de tus ejercicios, pausando para analizar lo que estás haciendo bien y en qué puedes mejorar. Esto ayuda a evitar lesiones y a mejorar con el tiempo."
      },
      {
        title: "Usa la observación sin imitación",
        content: "Mira a alguien que realice bien el ejercicio y observa su técnica. Luego, intenta imitarlo en tu propio cuerpo, prestando atención a cada movimiento."
      },
      {
        title: "Crea tus propias variaciones",
        content: "Si un ejercicio es monótono, personalízalo. Modifica pequeños detalles que lo hagan más desafiante o divertido, adaptándolo a tus gustos y estilo."
      },
      {
        title: "Escribe un mini resumen de tus avances",
        content: "Al finalizar, reflexiona sobre lo que lograste en la sesión. Escribe una frase o dos sobre tu experiencia, ayudándote a hacer un seguimiento y a mantenerte motivado."
      }
    ]
  },
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
