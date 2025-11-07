import { useEffect, useState } from "react";
import { fetchDetails } from "@/fetch/fetchDetail";
import { BookDetail } from "@/types/typesDetail";

export const useBookDetails = (bookIds: string[]) => {
  const [bookDetails, setBookDetails] = useState<BookDetail[] | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const validBooks = await fetchDetails(bookIds);
      setBookDetails(validBooks);
      setLoading(false);
    };
    fetchBooks();
  }, [bookIds]);

  return { bookDetails, loading };
};
