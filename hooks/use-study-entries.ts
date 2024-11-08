"use client";

import { useState, useEffect } from 'react';
import { StudyEntry, StudyEntryFormData } from '@/lib/types';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';

// Inicializa Supabase
const supabaseUrl = process.env.TU_SUPABASE_URL;
const supabaseKey = process.env.TU_SUPABASE_KEY;
const supabase = createClient('https://uormlxdiurjuykmhocfu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvcm1seGRpdXJqdXlrbWhvY2Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NjI5MTksImV4cCI6MjA0NjIzODkxOX0.dzR2drYGFLl3o9e8jwqGO5MpilvyErjK6LNflUAOEn0');

export function useStudyEntries() {
  const [entries, setEntries] = useState<StudyEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from('workout_entries') // Cambia esto al nombre de tu tabla
        .select('*');

      if (error) {
        console.error('Error fetching entries:', error);
      } else {
        setEntries(data);
      }
    };

    fetchEntries();
  }, []);

  const saveEntries = async (newEntries: StudyEntry[]) => {
    console.log(newEntries)
    // Guarda las entradas en Supabase
    const { error } = await supabase
      .from('workout_entries') // Cambia esto al nombre de tu tabla
      .upsert(newEntries);
    if (error) {
      console.error('Error saving entries:', error);
    } else {
      setEntries(newEntries);
    }
  };

  const addEntry = async (data: StudyEntryFormData) => {
    const newEntry: StudyEntry = {
      id: Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      challenges: data.challenges || "",
      duration: data.duration || 0,
      mood_after: data.mood_after || 0,
      mood_before: data.mood_before || 0,
      solutions: data.solutions || "",
      strategies: data.strategies || [],
      thoughts: data.thoughts || "",
      topic: data.topic || "",
    };
    console.log('newEntry', data)
    
    await saveEntries([newEntry, ...entries]);
    toast.success('Workout session logged successfully!');
    return newEntry;
  };

  const updateEntry = async (id: number, data: Partial<StudyEntryFormData>) => {
    // Actualiza la entrada en Supabase
    const { error } = await supabase
      .from('workout_entries') // Cambia esto al nombre de tu tabla
      .update(data) // Actualiza con los nuevos datos
      .eq('id', id); // Asegúrate de que 'id' es el nombre correcto de la columna

    if (error) {
      console.error('Error updating entry:', error);
    } else {
      // Actualiza el estado local después de la actualización
      const newEntries = entries.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              ...data,
              updated_at: new Date().toISOString(),
            }
          : entry
      );
      setEntries(newEntries); // Actualiza el estado local
      toast.success('Entry updated successfully!');
    }
  };
  const deleteEntry = async (id: number) => {
    console.log(id);
    // Elimina la entrada de Supabase
    const { error } = await supabase
      .from('workout_entries') // Cambia esto al nombre de tu tabla
      .delete()
      .eq('id', id); // Asegúrate de que 'id' es el nombre correcto de la columna

    if (error) {
      console.error('Error deleting entry:', error);
    } else {
      // Actualiza el estado local después de eliminar
      setEntries((prevEntries) => {
        const updatedEntries = prevEntries.filter((entry) => entry.id !== id);
        console.log('Updated entries:', updatedEntries); // Verifica el estado actualizado
        return updatedEntries; // Asegúrate de devolver el nuevo estado
      });
      toast.success('Entry deleted successfully!');
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cbt-study-journal-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully!');
  };

  const importData = async (file: File) => {
    try {
      const text = await file.text();
      const imported = JSON.parse(text);
      if (Array.isArray(imported)) {
        saveEntries(imported);
        toast.success('Data imported successfully!');
      } else {
        throw new Error('Invalid data format');
      }
    } catch (e) {
      toast.error('Failed to import data. Please check the file format.');
    }
  };

  return {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    exportData,
    importData,
  };
}