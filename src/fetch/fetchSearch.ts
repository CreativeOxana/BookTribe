import { BookSearchResponse } from "@/types/types";

export const fetchSearch = async () => {
  const response = await fetch(
    "https://openlibrary.org/search.json?q=harry+potter&limit=1"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch book data");
  }

  const data: BookSearchResponse = await response.json();

  return data;
};
