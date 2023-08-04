export interface DeckCard {
  id: string;
  front: string;
  back: string;
  archived: boolean;
  consecutive_corrects: number | null;
}

export interface Category {
  id: string;
  title: string;
}

export type GuessResult = "correct" | "incorrect";
