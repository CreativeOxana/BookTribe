import { fetchDetail } from "@/fetch/fetchDetail";
import { BookDetail } from "@/types/types";
import { useEffect, useState } from "react";
import { BookCard } from "./components/BookCard";
import { Box, Typography, CircularProgress } from "@mui/material";
import { validateBookDetail } from "@/utils/validateBookDetail";
import { ModalDetail } from "./components/ModalDetail";

export const BookList = () => {
  const booklist = [
    9780439708180, // Harry Potter and the Sorcerer's Stone (US edition)
    9780316769174, // The Catcher in the Rye
    9780061122415, // To Kill a Mockingbird (newer edition)
    9780743273565, // The Great Gatsby
    9780544003415, // The Lord of the Rings
  ];
  const [books, setBooks] = useState<BookDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookDetail | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleBookClick = (book: BookDetail) => {
    setSelectedBook(book);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedBook(null);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const bookPromises = booklist.map(async (isbn) => {
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

        setBooks(validBooks);

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

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: "darkgreen" }} size={50} />
        <Typography variant="h6" color="text.secondary">
          Načítám knihy...
        </Typography>
      </Box>
    );
  }

  if (error) return <div>Chyba: {error}</div>;
  if (books.length === 0) return <div>Žádné knihy</div>;

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: 2,
          justifyItems: "center",
          mb: 4,
          px: 1,
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        {books.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            onClick={() => handleBookClick(book)}
          />
        ))}
      </Box>
      <ModalDetail
        dialogOpen={dialogOpen}
        handleCloseDialog={handleCloseDialog}
        selectedBook={selectedBook}
      />
    </>
  );
};
