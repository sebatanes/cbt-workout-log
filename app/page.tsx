"use client";

import { useState } from "react";
import { useStudyEntries } from "@/hooks/use-study-entries";
import { StudyForm } from "@/components/study-form";
import { StudyEntries } from "@/components/study-entries";
import { StatsView } from "@/components/stats-view";
import { HistoryView } from "@/components/history-view";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Download, Upload } from "lucide-react";
import { StudyEntryFormData } from "@/lib/types";

export default function Home() {
  const { entries, addEntry, updateEntry, deleteEntry, exportData, importData } = useStudyEntries();
  const [activeTab, setActiveTab] = useState("form");

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importData(file);
    }
  };

  return (
    <main className="container mx-auto py-6 px-4 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Diario de Estudio CBT</h1>
          <p className="text-muted-foreground">Registro sesión a sesión
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
            id="import-file"
          />
          <Button variant="outline" onClick={exportData}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <label htmlFor="import-file">
            <Button variant="outline" asChild>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Importar
              </span>
            </Button>
          </label>
          <ThemeToggle />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="form">Nueva Entrada</TabsTrigger>
          <TabsTrigger value="entries">Historial</TabsTrigger>
          <TabsTrigger value="timeline">Línea de Tiempo</TabsTrigger>
          <TabsTrigger value="stats">Analíticas</TabsTrigger>
        </TabsList>
        <TabsContent value="form" className="mt-6">
          <StudyForm onSubmit={(data) => {
            addEntry(data);
            setActiveTab("entries");
          }} />
        </TabsContent>
        <TabsContent value="entries" className="mt-6">
          <StudyEntries
            entries={entries}
            onUpdate={(id: string, data: Partial<StudyEntryFormData>) => updateEntry(Number(id), data)}
            onDelete={(id: string) => deleteEntry(Number(id))}
          />
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