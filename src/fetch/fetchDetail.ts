import { BookDetailResponse } from "@/types/types";

export const fetchDetail = async (isbn: string) => {
  const response = await fetch(
    `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch book data");
  }

  const data: BookDetailResponse = await response.json();

  return data;
};
