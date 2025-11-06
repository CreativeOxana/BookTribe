import { BookSearchResponse } from "@/types/typesSearch";

// Funkce pro vyhledání 10 knih podle žánru
export const searchBooksByGenre = async (genre: string = "romance", limit = 10) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?subject=${encodeURIComponent(genre)}&limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as BookSearchResponse;
  } catch (error) {
    console.error("Error in searchBooksByGenre:", error);
    throw error;
  }
};
