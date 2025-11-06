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
