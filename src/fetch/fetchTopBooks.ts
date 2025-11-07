import { BookSearchResponse } from "@/types/typesSearch";

// Funkce pro vyhledání TOP knih podle různých kategorií
export const searchTopBooks = async (category: string, limit = 10): Promise<BookSearchResponse> => {
  try {
    let searchQuery = "";
    let sortParam = "";
    
    switch (category) {
      case "bestsellers":
        searchQuery = "bestsellers";
        sortParam = "&sort=rating";
        break;
      case "new-releases":
        searchQuery = "new books";
        sortParam = "&sort=new";
        break;
      case "most-read":
        searchQuery = "popular fiction";
        sortParam = "&sort=readinglog";
        break;
      case "award-winners":
        searchQuery = "pulitzer OR nebula OR hugo award";
        sortParam = "&sort=rating";
        break;
      case "classics":
        searchQuery = "classic literature";
        sortParam = "&sort=rating";
        break;
      case "trending":
        searchQuery = "trending books 2024";
        sortParam = "&sort=new";
        break;
      case "young-adult":
        searchQuery = "young adult";
        sortParam = "&sort=rating";
        break;
      case "sci-fi-fantasy":
        searchQuery = "science fiction fantasy";
        sortParam = "&sort=rating";
        break;
      default:
        searchQuery = "bestsellers";
        sortParam = "&sort=rating";
    }

    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}${sortParam}&limit=${limit}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as BookSearchResponse;
  } catch (error) {
    console.error(`Error in searchTopBooks for category ${category}:`, error);
    throw error;
  }
};

// Funkce pro vyhledání knih podle roku vydání
export const searchBooksByYear = async (year: number, limit = 10): Promise<BookSearchResponse> => {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=*&first_publish_year=${year}&sort=rating&limit=${limit}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as BookSearchResponse;
  } catch (error) {
    console.error(`Error in searchBooksByYear for year ${year}:`, error);
    throw error;
  }
};