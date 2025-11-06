import { BookSearchResponse } from "@/types/typesSearch";

// Funkce pro vyhledání 10 populárních knih
export const searchPopularBooks = async (query: string = "bestsellers", limit = 10) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&sort=rating&limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as BookSearchResponse;
  } catch (error) {
    console.error("Error in searchPopularBooks:", error);
    throw error;
  }
};
