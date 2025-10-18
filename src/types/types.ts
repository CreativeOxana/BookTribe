export type BookSearch = {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  publisher?: string[];
  number_of_pages_median?: number;
  subject?: string[];
  cover_i?: number;
  isbn?: string[];
  language?: string[];
  key: string;
};

export type BookSearchResponse = {
  docs: BookSearch[];
  numFound: number;
};

export type BookDetail = {
  title: string;
  authors?: string[];
  publish_date?: number;
  publisher?: string[];
  number_of_pages_median?: number;
  subject?: string[];
  cover_i?: number;
  isbn?: string[];
  language?: string[];
  key: string;
};

export type BookDetailResponse = Record<string, BookDetail>;
