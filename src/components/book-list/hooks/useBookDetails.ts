import { BookDetail } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchDetail } from "@/fetch/fetchDetail";
import { validateBookDetail } from "@/utils/validateBookDetail";

export const useBookDetails = (bookIds: string[]) => {
  const [bookDetails, setBookDetails] = useState<BookDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const bookPromises = bookIds.map(async (isbn) => {
          try {
            const data = await fetchDetail(isbn);
            const validBookDetail = validateBookDetail(data);
            return validBookDetail;
          } catch (err) {
            return;
          }
        });

        const results = await Promise.all(bookPromises);
        const validBooks = results.filter(
          (book): book is BookDetail => book !== undefined
        );

        setBookDetails(validBooks);

        if (validBooks.length === 0) setError("Žádné knihy nenalezeny");
      } catch (err) {
        setError(
          `Chyba: ${err instanceof Error ? err.message : "Neznámá chyba"}`
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return { bookDetails, loading, error };
};
