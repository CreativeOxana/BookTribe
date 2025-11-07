export type BookSearch = {
  title: string;
  author_name?: string[];
  author_key?: string[];
  cover_edition_key?: string;
  edition_count?: number;
  ebook_access?: string;
  first_publish_year?: number;
  has_fulltext?: boolean;
  language?: string[];
  key: string;
  cover_i?: number;
  id: string;
};

export type BookSearchResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  docs: any[];
  numFound: number;
};
