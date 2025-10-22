"use client";
import { Container, Typography } from "@mui/material";
import dynamic from "next/dynamic";

// Dynamicky načteme BookList komponentu
const BookList = dynamic(
  () =>
    import("@/components/book-list/BookList").then((mod) => ({
      default: mod.BookList,
    })),
  {
    loading: () => <Typography textAlign="center">Načítám knihy...</Typography>,
    ssr: false,
  }
);

export default function Home() {
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

      <BookList />
    </Container>
  );
}
