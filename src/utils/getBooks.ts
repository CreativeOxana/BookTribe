import { Book, BookDetail, UserBookRow } from "@/types/typesDetail";

export const getBooks = (userBookRows: Record<string, UserBookRow>, bookDetails: BookDetail[] = []): Book[] => {
  return Object.values(userBookRows)
    .map((userBookRow) => {
      const detail = bookDetails.find((book) => book.id === userBookRow.id);
      if (detail) {
        return { ...userBookRow, detail } as Book;
      }
    })
    .filter((book): book is Book => book !== undefined);
};
