import { BookDetail, BookDetailResponse } from "@/types/typesDetail";
import { validateBookDetail } from "@/utils/validateBookDetail";

const fetchDetail = async (isbn: string) => {
  const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);

  if (!response.ok) {
    throw new Error("Failed to fetch book data");
  }

  const data: BookDetailResponse = await response.json();
  const validBookDetail = validateBookDetail(data);
  return validBookDetail;
};

export const fetchDetails = async (bookIds: string[]) => {
  const bookPromises = bookIds.map(async (isbn) => {
    const data = await fetchDetail(isbn);
    return data;
  });

  const results = await Promise.all(bookPromises);
  const validBooks = results.filter((book): book is BookDetail => book !== undefined);
  return validBooks;
};
