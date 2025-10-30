export type BookSearch = {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  publisher?: string[];
  number_of_pages_median?: number;
  subject?: string[];
  cover_i?: number;
  language?: string[];
  key: string;
};

export type BookSearchResponse = {
  docs: BookSearch[];
  numFound: number;
};

export type BookDetail = {
  title: string;
  authors?: { name: string; url?: string };
  publish_date?: string;
  publishers?: { name: string };
  number_of_pages?: number;
  subjects?: { name: string; url?: string };
  subject_people?: { name: string; url: string };
  subject_places?: { name: string; url: string };
  subject_times?: { name: string; url: string };
  cover?: {
    small?: string;
    medium?: string;
    large?: string;
  };
  identifiers?: {
    goodreads?: string[];
    isbn_10?: string[];
    isbn_13?: string[];
    librarything?: string[];
    openlibrary?: string[];
  };
  language?: string[];
  id: string;
  url?: string;
};

export type BookDetailResponse = Record<string, BookDetail>;

export type UserBookRow = {
  id: string;
  isRead: boolean;
};

export type Book = UserBookRow & {
  detail: BookDetail;
};

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
