import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { Book, UserBookRow } from "@/types/types";
import { BookCard } from "./components/BookCard";
import { ModalDetail } from "./components/ModalDetail";

export const BookList = ({
  books,
  createRow,
  updateRow,
}: {
  books: Book[];
  createRow: (id: string) => void;
  updateRow: (id: string, value: Partial<UserBookRow>) => void;
}) => {
  console.log("🚀 ~ books:", books);
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
        {books.map((book: Book) => {
          return <BookCard key={book.id} book={book} onClick={() => handleBookClick(book)} />;
        })}
      </Box>
      {selectedBook && (
        <ModalDetail
          dialogOpen={dialogOpen}
          handleCloseDialog={handleCloseDialog}
          book={selectedBook}
          updateRow={updateRow}
        />
      )}

      <Stack sx={{ gap: 1 }}>
        {["9780061122415", "9780743273565", "9780544003415"].map((id) => (
          <Button key={id} variant="contained" onClick={() => createRow(id)}>
            Přidat {id}
          </Button>
        ))}
      </Stack>
    </>
  );
};
