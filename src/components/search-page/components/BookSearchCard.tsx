"use client";

import { Search as SearchIcon } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { searchBooks } from "@/fetch/fetchSearchMain";
import { BookSearch } from "@/types/typesSearch";

export const BookSearchCard = () => {
  const [query, setQuery] = useState("harry potter");
  const [searchResults, setSearchResults] = useState<BookSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Jednoduchý lokální stav pro sledování přidaných knih
  const [addedBooks, setAddedBooks] = useState<Set<string>>(new Set());

  // Přidat knihu
  const handleAddBook = (bookKey: string, bookTitle: string) => {
    setAddedBooks((prev) => new Set([...prev, bookKey]));
    console.log(`📚 Kniha "${bookTitle}" přidána`);
  };

  // Odebrat knihu
  const handleRemoveBook = (bookKey: string, bookTitle: string) => {
    setAddedBooks((prev) => {
      const newSet = new Set(prev);
      newSet.delete(bookKey);
      return newSet;
    });
    console.log(`❌ Kniha "${bookTitle}" odebrána`);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Zadejte prosím vyhledávací dotaz");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      const response = await searchBooks(query, 10);
      setSearchResults(response.docs);
      if (response.docs.length === 0) {
        setError("Žádné knihy nebyly nalezeny. Zkuste jiný vyhledávací výraz.");
      }
    } catch (err) {
      setError(`Chyba při vyhledávání: ${err instanceof Error ? err.message : "Neznámá chyba"}`);
    } finally {
      setLoading(false);
    }
  };

  // Vrátí URL coveru z různých polí (cover_i, cover_edition_key (OLID), nebo ISBN)
  const getCoverUrlForBook = (book: BookSearch): string | null => {
    // 1) cover_i (covers by id)
    if (book.cover_i) return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

    // 2) cover_edition_key (OLID)
    if (book.cover_edition_key) return `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`;
    return null;
  };

  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        textAlign="center"
        sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
      >
        🔍 Najdi knihu
      </Typography>

      {/* Zobrazení počtu knih v seznamu */}
      {addedBooks.size > 0 && (
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Chip
            label={`📚 Chci přečíst: ${addedBooks.size} ${addedBooks.size === 1 ? "kniha" : addedBooks.size < 5 ? "knihy" : "knih"}`}
            color="secondary"
            variant="outlined"
            sx={{ fontSize: "0.9rem", px: 1 }}
          />
        </Box>
      )}
      {/* Vyhledávací formulář */}
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          maxWidth: 600,
          mx: "auto",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Vyhledejte knihu..."
          placeholder="Zadejte název knihy nebo autora"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
          sx={{ flexGrow: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading || !query.trim()}
          startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
          sx={{ minWidth: 120, height: 56 }}
        >
          {loading ? "Hledám..." : "Vyhledat"}
        </Button>
      </Box>
      {/* Chybová zpráva */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, maxWidth: 600, mx: "auto" }}>
          {error}
        </Alert>
      )}
      {/* Výsledky vyhledávání */}
      {hasSearched && !loading && !error && (
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Výsledky vyhledávání ({searchResults.length} nalezeno):
          </Typography>
          <List sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
            {searchResults.map((book, index) => {
              const { key, title, author_name = [], first_publish_year } = book;
              const coverSrc = getCoverUrlForBook(book);
              return (
                <Box key={`${key}-${index}`} sx={{ position: "relative" }}>
                  <ListItem disablePadding>
                    <Box
                      sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "flex-start",
                        width: "100%",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                    >
                      {/* Action Buttons - pravý horní roh */}
                      <Stack
                        direction="column"
                        gap={1}
                        sx={{
                          position: "absolute",
                          right: 16,
                          top: 16,
                          zIndex: 2,
                          alignItems: "center",
                        }}
                      >
                        {!addedBooks.has(key) ? (
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<span>➕</span>}
                            onClick={(e) => {
                              e.stopPropagation(); // Zabraňuje kliknuti na rodičovský element
                              handleAddBook(key, title);
                            }}
                            sx={{
                              minWidth: 90,
                              fontSize: "0.75rem",
                              py: 0.5,
                              backgroundColor: "success.main",
                              color: "success.contrastText",
                              "&:hover": {
                                backgroundColor: "success.dark",
                              },
                            }}
                          >
                            Přidat
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            startIcon={<span>➖</span>}
                            onClick={(e) => {
                              e.stopPropagation(); // Zabraňuje kliknuti na rodičovský element
                              handleRemoveBook(key, title);
                            }}
                            sx={{
                              minWidth: 90,
                              fontSize: "0.75rem",
                              py: 0.5,
                            }}
                          >
                            Odebrat
                          </Button>
                        )}
                      </Stack>
                      {/* Obrázek knihy */}
                      {coverSrc ? (
                        <Box
                          component="img"
                          src={coverSrc}
                          alt={title}
                          sx={{
                            width: 60,
                            height: 80,
                            objectFit: "cover",
                            borderRadius: 1,
                            mr: 2,
                            flexShrink: 0,
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : null}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div" gutterBottom>
                          {title}
                        </Typography>
                        {author_name.length > 0 && (
                          <Typography variant="body2" color="text.secondary" gutterBottom component="div">
                            Autor: {author_name.join(", ")}
                          </Typography>
                        )}
                        {first_publish_year && (
                          <Typography variant="body2" color="text.secondary" gutterBottom component="div">
                            Rok vydání: {first_publish_year}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </ListItem>
                  {index < searchResults.length - 1 && <Divider />}
                </Box>
              );
            })}
          </List>
        </Box>
      )}
      {/* Loading state */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            py: 4,
          }}
        >
          <CircularProgress size={50} />
          <Typography variant="h6" color="text.secondary">
            Vyhledávám knihy...
          </Typography>
        </Box>
      )}
    </>
  );
};
