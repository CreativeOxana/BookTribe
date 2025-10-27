"use client";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { BookList } from "@/components/book-list/BookList";
import { useBookDetails } from "@/components/book-list/hooks/useBookDetails";
import { getBooks } from "@/utils/getBooks";
import { useUserBookRows } from "@/components/book-list/hooks/useUserBookRows";
import { useMemo } from "react";

export default function Home() {
  const { userBookRows, createRow, updateRow } = useUserBookRows();
  const booklist = useMemo(() => Object.keys(userBookRows), [userBookRows]);
  const { bookDetails, loading, error } = useBookDetails(booklist);
  const books = getBooks(userBookRows, bookDetails);

  if (error) return <div>Chyba: {error}</div>;
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        textAlign="center"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: "green",
        }}
      >
        📚 BookNest - Populární knihy
      </Typography>
      {loading && (
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
      )}

      <BookList books={books} createRow={createRow} updateRow={updateRow} />
    </Container>
  );
}
