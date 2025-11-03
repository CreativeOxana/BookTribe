import { BookDetail, BookDetailResponse } from "@/types/types";

export const validateBookDetail = (data: BookDetailResponse): BookDetail | undefined => {
  if (data && Object.values(data).length > 0) {
    const bookData = Object.values(data)[0] as BookDetail;

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
      id:
        Array.isArray(bookData.identifiers?.isbn_13) && bookData.identifiers?.isbn_13.length > 0
          ? bookData.identifiers.isbn_13[0]
          : "Neznámé ISBN",
    };

    return convertedBook;
  } else {
    return;
  }
};
