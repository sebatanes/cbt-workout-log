export type MoodType = 1 | 2 | 3 | 4 | 5;

export interface StudyEntry {
  id: number;
  topic: string;
  duration: number;
  mood_before: MoodType;
  mood_after: MoodType;
  thoughts: string;
  strategies: string[];
  challenges: string;
  solutions: string;
  created_at: string;
  updated_at: string;
}

export interface StudyEntryFormData {
  topic: string;
  duration: number;
  mood_before: MoodType;
  mood_after: MoodType;
  thoughts: string;
  strategies: string[];
  challenges: string;
  solutions: string;
}