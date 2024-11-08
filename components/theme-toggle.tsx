"use client";

import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  // Establece el tema "ocean" al cargar
  setTheme("dark");

  return (
    <Button variant="ghost" size="icon" disabled>
      <Moon className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Ocean theme active</span>
    </Button>
  );
}
