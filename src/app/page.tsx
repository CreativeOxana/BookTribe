"use client";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { BookList } from "@/components/book-list/BookList";
import { useBookDetails } from "@/components/book-list/hooks/useBookDetails";
import { UserBookRow } from "@/types/types";
import { useState } from "react";
import { getBooks } from "@/utils/getBooks";

const defaultUserBookRows: Record<string, UserBookRow> = {
  "9780439708180": {
    id: "9780439708180",
    isRead: false,
  },
  "9780316769174": {
    id: "9780316769174",
    isRead: false,
  },
  "9780061122415": {
    id: "9780061122415",
    isRead: false,
  },
  "9780743273565": {
    id: "9780743273565",
    isRead: false,
  },
  "9780544003415": {
    id: "9780544003415",
    isRead: false,
  },
};

export default function Home() {
  const [userBookRows, setUserBookRows] =
    useState<Record<number, UserBookRow>>(defaultUserBookRows);
  console.log("🚀 ~ Home ~ userBookRows:", userBookRows);
  const booklist = Object.keys(userBookRows);
  const { bookDetails, loading, error } = useBookDetails(booklist);
  console.log("🚀 ~ Home ~ bookDetails:", bookDetails);
  const books = getBooks(userBookRows, bookDetails);
  console.log("🚀 ~ Home ~ books:", books);

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

      <BookList books={books} />
    </Container>
  );
}
