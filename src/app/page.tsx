"use client";
import { Container, Typography } from "@mui/material";
import { BookList } from "@/components/book-list/BookList";

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
