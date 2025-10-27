import { Book } from "@/types/types";
import { useState } from "react";
import { BookCard } from "./components/BookCard";
import { Box } from "@mui/material";
import { ModalDetail } from "./components/ModalDetail";

export const BookList = ({ books }: { books: Book[] }) => {
  // Použití custom hooku pro načítání dat

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedBook(null);
  };

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
            key={book.id}
            book={book.detail}
            onClick={() => handleBookClick(book)}
          />
        ))}
      </Box>
      {selectedBook && (
        <ModalDetail
          dialogOpen={dialogOpen}
          handleCloseDialog={handleCloseDialog}
          book={selectedBook}
        />
      )}
    </>
  );
};
