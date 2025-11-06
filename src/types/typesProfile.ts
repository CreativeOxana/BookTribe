import { BookDetail } from "./typesDetail";

// Profile related types
export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: Date;
};

export type ReadingGoal = {
  id: string;
  year: number;
  targetBooks: number;
  currentBooks: number;
  description: string;
};

export type BookNote = {
  id: string;
  bookId: string;
  note: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
};

export type BookPhoto = {
  id: string;
  bookId: string;
  url: string;
  caption?: string;
  createdAt: Date;
};

export type WantToReadBook = {
  id: string;
  bookId: string;
  bookDetail: BookDetail;
  comment?: string;
  priority: "low" | "medium" | "high";
  addedAt: Date;
};

export type ReadBook = {
  id: string;
  bookId: string;
  bookDetail: BookDetail;
  readAt: Date;
  rating?: number;
  notes: BookNote[];
  photos: BookPhoto[];
};

export type UserProfile = {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  badges: Badge[];
  readingGoals: ReadingGoal[];
  wantToRead: WantToReadBook[];
  readBooks: ReadBook[];
  joinedAt: Date;
};
