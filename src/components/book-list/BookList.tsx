import { fetchDetail } from "@/fetch/fetchDetail";
import { BookDetail } from "@/types/types";
import { useEffect, useState } from "react";
import { BookCard } from "./components/BookCard";

export const BookList = () => {
  const booklist = [9780140328721];
  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await fetchDetail(booklist[0]);

        console.log("Data:", data);
        console.log("📡 API Response:", Object.values(data));
        console.log("📡 API Response:", Object.keys(data));

        if (data && Object.values(data).length > 0) {
          const bookData = Object.values(data)[0];
          setBook(bookData);
        } else {
          console.log("❌ Žádná data nenalezena");
          setError("Kniha nebyla nalezena");
        }
      } catch (err) {
        console.error("❌ API Error:", err);
        setError(
          `Chyba při načítání dat: ${err instanceof Error ? err.message : "Neznámá chyba"}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, []);

  if (!book) {
    return null;
  }

  return <BookCard book={book} />;
};
