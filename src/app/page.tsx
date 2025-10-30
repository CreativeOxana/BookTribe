"use client";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Divider,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { BookList } from "@/components/book-list/BookList";
import { BookSearchCard } from "@/components/book-search/BookSearchCard";
import { ProfilePage } from "@/components/book-list/components/ProfilePage";
import { useBookDetails } from "@/components/book-list/hooks/useBookDetails";
import { getBooks } from "@/utils/getBooks";
import { useUserBookRows } from "@/components/book-list/hooks/useUserBookRows";
import { useMemo, useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
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
        📚 BookNest
      </Typography>

      {/* Tabs Navigation */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              fontWeight: "bold",
              fontSize: "1rem",
            },
          }}
        >
          <Tab label="👤 Můj profil" />
          <Tab label="📚 Populární knihy" />
          <Tab label="🔍 Vyhledávání" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {activeTab === 0 && <ProfilePage />}

      {activeTab === 1 && (
        <Box>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            textAlign="center"
            sx={{ mb: 4, fontWeight: "bold", color: "darkgreen" }}
          >
            Populární knihy
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
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <BookSearchCard />
        </Box>
      )}
    </Container>
  );
}
