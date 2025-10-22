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
  key: string;
  url?: string;
  ebooks?: { [key: string]: any };
  excerpts?: { [key: string]: any };
};

export type BookDetailResponse = Record<string, BookDetail>;
