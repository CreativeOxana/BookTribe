import { BookDetail, BookDetailResponse } from "@/types/typesDetail";

export const validateBookDetail = (data: BookDetailResponse): BookDetail | undefined => {
  if (data && Object.values(data).length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bookData = Object.values(data)[0] as any;

    if (!bookData.title) {
      return;
    }

    const convertedBook: BookDetail = {
      title: bookData.title || "Neznámý název",
      authors:
        Array.isArray(bookData.authors) && bookData.authors.length > 0 ? { name: bookData.authors[0].name } : undefined,
      publishers:
        Array.isArray(bookData.publishers) && bookData.publishers.length > 0
          ? { name: bookData.publishers[0].name }
          : undefined,
      publish_date: bookData.publish_date,
      number_of_pages: bookData.number_of_pages,
      cover: bookData.cover,
      identifiers: bookData.identifiers,
      language: bookData.language,
      id: bookData.identifiers?.isbn_13.toString(),
    };

    return convertedBook;
  } else {
    return;
  }
};
