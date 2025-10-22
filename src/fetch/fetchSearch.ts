import { BookSearchResponse } from "@/types/types";

// export const fetchSearch = async () => {
//   const response = await fetch(
//     "https://openlibrary.org/search.json?q=harry+potter&limit=1"
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch book data");
//   }

//   const data: BookSearchResponse = await response.json();

//   return data;
// };

// export const searchByTitle = async (title: string, limit = 10) => {
//   try {
//     const response = await fetch(
//       `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=${limit}`
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return (await response.json()) as BookSearchResponse;
//   } catch (error) {
//     console.error("Error in searchByTitle:", error);
//     throw error;
//   }
// };

// Funkce pro vyhledání 5 populárních knih
export const searchPopularBooks = async (
  query: string = "bestsellers",
  limit = 5
) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&sort=rating&limit=${limit}`
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

// Funkce pro vyhledání 5 knih podle žánru
export const searchBooksByGenre = async (
  genre: string = "romance",
  limit = 5
) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?subject=${encodeURIComponent(genre)}&limit=${limit}`
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
