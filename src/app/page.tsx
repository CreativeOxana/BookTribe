"use client";
import { BookList } from "@/components/book-list/BookList";
import { fetchSearch } from "@/fetch/fetchSearch";
import { BookSearch } from "@/types/types";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Box,
  Stack,
  Grid,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [book, setBook] = useState<BookSearch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await fetchSearch();

        console.log("📡 API Response:", data);
        console.log("📊 Number found:", data.numFound);
        console.log("📚 Docs length:", data.docs?.length);

        if (data.docs && data.docs.length > 0) {
          const bookData = data.docs[0];
          console.log("📚 Načtená kniha:", bookData.title);
          console.log("🖼️ Cover ID:", bookData.cover_i);
          console.log("👤 Authors:", bookData.author_name);
          console.log("📖 ISBN:", bookData.isbn);
          console.log("🏢 Publisher:", bookData.publisher);
          console.log("📄 Pages:", bookData.number_of_pages_median);
          console.log("🏷️ Subject:", bookData.subject);
          console.log("📅 First publish year:", bookData.first_publish_year);
          console.log("🌍 Language:", bookData.language);
          console.log("📝 Full book data:", bookData);
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

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" color="error" textAlign="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h3"
        gutterBottom
        textAlign="center"
        sx={{ mb: 4 }}
      >
        Detaily knihy
      </Typography>
      <BookList />
    </Container>
  );
}
