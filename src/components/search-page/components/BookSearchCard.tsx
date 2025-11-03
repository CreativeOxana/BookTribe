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
  ListItemButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { searchBooks } from "@/fetch/fetchSearch";
import { Book, BookDetail, BookSearch, UserBookRow } from "@/types/types";
import { validateBookDetail } from "@/utils/validateBookDetail";

export const BookSearchCard = () => {
  const [query, setQuery] = useState("harry potter");
  const [searchResults, setSearchResults] = useState<BookSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

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

  const getCoverUrl = (coverId?: number) => {
    if (!coverId) return null;
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  };

  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        textAlign="center"
        sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}
      >
        🔍 Najdi knihu
      </Typography>
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
              const { key, title, author_name = [], first_publish_year, publisher = [], subject = [], cover_i } = book;
              return (
                <Box key={`${key}-${index}`} sx={{ position: "relative" }}>
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={{
                        p: 2,
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
                        <Chip
                          label="Přidat"
                          color="primary"
                          icon={<span>➕</span>}
                          sx={{
                            minWidth: 90,
                            textAlign: "center",
                            whiteSpace: "nowrap",
                          }}
                        />
                        <Chip
                          label="Odebrat"
                          color="error"
                          icon={<span>➖</span>}
                          sx={{
                            minWidth: 90,
                            textAlign: "center",
                            whiteSpace: "nowrap",
                          }}
                        />
                      </Stack>
                      {/* Obrázek knihy */}
                      {cover_i && getCoverUrl(cover_i) && (
                        <Box
                          component="img"
                          src={getCoverUrl(cover_i)!}
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
                      )}
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
                        {publisher.length > 0 && (
                          <Typography variant="body2" color="text.secondary" gutterBottom component="div">
                            Vydavatel: {publisher[0]}
                          </Typography>
                        )}
                        {subject.length > 0 && (
                          <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mt: 1 }}>
                            {subject.slice(0, 3).map((subj, subIndex) => (
                              <Chip
                                key={subIndex}
                                label={subj}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: "0.7rem" }}
                              />
                            ))}
                            {subject.length > 3 && (
                              <Chip
                                label={`+${subject.length - 3} další`}
                                size="small"
                                variant="outlined"
                                color="primary"
                                sx={{ fontSize: "0.7rem" }}
                              />
                            )}
                          </Stack>
                        )}
                      </Box>
                    </ListItemButton>
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
