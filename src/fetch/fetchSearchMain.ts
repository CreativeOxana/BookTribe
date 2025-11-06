import { BookSearchResponse } from "@/types/typesSearch";
import { validateBookSearch } from "@/utils/validateBookSearch";

// Hlavní vyhledávací funkce — volá OpenLibrary a validuje výsledky přes validateBookSearch
export const searchBooks = async (query: string, limit = 10): Promise<BookSearchResponse> => {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: BookSearchResponse = await response.json();

    // Aplikujeme validaci a vrátíme pouze validní dokumenty
    const validSearch = validateBookSearch(data);

    return {
      ...data,
      docs: validSearch,
      numFound: validSearch.length,
    };
  } catch (error) {
    console.error("Error in searchBooks:", error);
    throw error;
  }
};
