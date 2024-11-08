import React from 'react';

export const Goals: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Metas de Fuerza - Programa Greek God</h2>
      <p>Metas específicas de fuerza y peso para alcanzar el físico griego.</p>

      <ul className="list-disc ml-6 mt-4 space-y-2">
        <li>
          <strong>Press de Banca:</strong> Meta avanzada - 1.25x tu peso corporal (aprox. 85 kg para ti).
        </li>
        <li>
          <strong>Dominadas con Peso:</strong> Meta avanzada - 25-35 kg adicionales al peso corporal.
        </li>
        <li>
          <strong>Press Militar:</strong> Meta avanzada - equivalente a tu peso corporal (aprox. 70 kg).
        </li>
        <li>
          <strong>Press Inclinado con Mancuernas:</strong> 3 series de 8-10 repeticiones con 30-35 kg por mano.
        </li>
        <li>
          <strong>Sentadilla Búlgara:</strong> 3 series de 8 repeticiones con 25-30 kg por mano.
        </li>
        <li>
          <strong>Peso Recomendado:</strong> Para tu estatura (1.70 m) y objetivos, un peso saludable sería entre 68 y 73 kg, con un porcentaje de grasa corporal entre 8-12% para una composición muscular definida.
        </li>
      </ul>

      <h3 className="text-xl font-bold mt-6">Rutina de Entrenamiento</h3>
      <p>Rutina de 3 días para progresar en fuerza usando una barra de dominadas y mancuernas regulables.</p>

      <ul className="list-disc ml-6 mt-4 space-y-2">
        <li>
          <strong>Día 1: Pecho y Hombros</strong>
          <ul className="ml-4 list-disc">
            <li>Press inclinado con mancuernas: 4 series de 8-10 repeticiones</li>
            <li>Press militar con mancuernas (de pie): 4 series de 8 repeticiones</li>
            <li>Fondos en banco: 3 series al fallo</li>
            <li>Elevaciones laterales: 3 series de 12-15 repeticiones</li>
          </ul>
        </li>

        <li>
          <strong>Día 2: Espalda y Bíceps</strong>
          <ul className="ml-4 list-disc">
            <li>Dominadas: 4 series de 5-8 repeticiones, añadiendo peso gradualmente</li>
            <li>Remo con mancuernas (unilateral): 4 series de 10 repeticiones por lado</li>
            <li>Curl con mancuernas: 3 series de 10-12 repeticiones</li>
            <li>Dominadas excéntricas: 2 series al fallo</li>
          </ul>
        </li>

        <li>
          <strong>Día 3: Piernas y Core</strong>
          <ul className="ml-4 list-disc">
            <li>Sentadilla búlgara con mancuernas: 4 series de 8-10 repeticiones por pierna</li>
            <li>Elevaciones de pantorrillas (unilateral): 3 series de 15 repeticiones por pierna</li>
            <li>Plancha con peso: 3 series de 30-60 segundos</li>
            <li>Encogimientos en el suelo: 3 series de 15-20 repeticiones</li>
          </ul>
        </li>
      </ul>

      <p className="mt-4">
        <strong>Nota:</strong> Intenta aumentar el peso o el número de repeticiones semanalmente o cada dos semanas. Realiza 5-10 minutos de calentamiento antes de cada sesión.
      </p>
    </div>
  );
};
