"use client";

import { useState } from "react";
import { useStudyEntries } from "@/hooks/use-study-entries";
import { StudyForm } from "@/components/study-form";
import { StudyEntries } from "@/components/study-entries";
import { StatsView } from "@/components/stats-view";
import { HistoryView } from "@/components/history-view";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Download, Upload } from "lucide-react";
import { StudyEntryFormData } from "@/lib/types";
import { Strategies } from "@/components/strategies";

export default function Home() {
  const { entries, addEntry, updateEntry, deleteEntry, exportData } = useStudyEntries();
  const [activeTab, setActiveTab] = useState("form");

  return (
    <main className="container mx-auto py-6 px-4 space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold">Diario de Estudio TCC</h1>
          <p className="text-muted-foreground">Registro sesión a sesión</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Button variant="outline" onClick={exportData} className="hidden md:flex">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4 mb-4 md:mt-0">
        <TabsList className="tabs-list grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="form">Nueva Entrada</TabsTrigger>
          <TabsTrigger value="strategies">Diario de Estudio TCC</TabsTrigger>
          <TabsTrigger value="entries">Historial</TabsTrigger>
          <TabsTrigger value="timeline">Línea de Tiempo</TabsTrigger>
          <TabsTrigger value="stats">Analíticas</TabsTrigger>
        </TabsList>
        <TabsContent value="form" className="tabs-content mt-6">
          <StudyForm
            onSubmit={(data) => { addEntry(data); setActiveTab("entries"); }}
            onStrategies={() => setActiveTab("strategies")} // Aquí se pasa la función para cambiar a la pestaña de estrategias
          />
        </TabsContent>
        <TabsContent value="entries" className="mt-6">
          <StudyEntries
            entries={entries}
            onUpdate={(id: string, data: Partial<StudyEntryFormData>) => updateEntry(Number(id), data)}
            onDelete={(id: string) => deleteEntry(Number(id))}
          />
        </TabsContent>
        
        <TabsContent value="strategies" className="mt-6">
          <Strategies />
        </TabsContent>
        <TabsContent value="timeline" className="mt-6">
          <HistoryView entries={entries} />
        </TabsContent>
        <TabsContent value="stats" className="mt-6">
          <StatsView entries={entries} />
        </TabsContent>
      </Tabs>
    </main>
  );
}