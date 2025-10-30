"use client";
import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { searchBooks } from "@/fetch/fetchSearch";
import { fetchDetail } from "@/fetch/fetchDetail";
import { BookSearch, Book, BookDetail, UserBookRow } from "@/types/types";

import { validateBookDetail } from "@/utils/validateBookDetail";
import { ModalDetail } from "@/components/recommend-page/components/book-list/components/ModalDetail";

export const BookSearchCard = () => {
  const [query, setQuery] = useState("harry potter");
  const [searchResults, setSearchResults] = useState<BookSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Modal state
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Funkce pro převod BookSearch na Book objekt pro modal
  const convertBookSearchToBook = (bookSearch: BookSearch): Book => {
    const bookDetail: BookDetail = {
      id: bookSearch.key,
      title: bookSearch.title,

      // Autoři - převedeme všechny autory
      authors:
        bookSearch.author_name && bookSearch.author_name.length > 0
          ? { name: bookSearch.author_name.join(", ") }
          : undefined,

      // Rok vydání
      publish_date: bookSearch.first_publish_year?.toString(),

      // Vydavatelé - převedeme všechny vydavatele
      publishers:
        bookSearch.publisher && bookSearch.publisher.length > 0
          ? { name: bookSearch.publisher.join(", ") }
          : undefined,

      // Počet stran
      number_of_pages: bookSearch.number_of_pages_median,

      // Obrázek knihy
      cover: bookSearch.cover_i
        ? {
            small: `https://covers.openlibrary.org/b/id/${bookSearch.cover_i}-S.jpg`,
            medium: `https://covers.openlibrary.org/b/id/${bookSearch.cover_i}-M.jpg`,
            large: `https://covers.openlibrary.org/b/id/${bookSearch.cover_i}-L.jpg`,
          }
        : undefined,

      // Témata/žánry - převedeme všechny subjects
      subjects:
        bookSearch.subject && bookSearch.subject.length > 0
          ? { name: bookSearch.subject.join(", ") }
          : undefined,

      // Jazyky
      language: bookSearch.language,

      // Identifikátory - vytvoříme z dostupných dat
      identifiers: {
        openlibrary: [bookSearch.key], // Open Library klíč
      },

      // URL na Open Library
      url: `https://openlibrary.org${bookSearch.key}`,
    };

    const userBookRow: UserBookRow = {
      id: bookSearch.key,
      isRead: false,
    };

    return {
      ...userBookRow,
      detail: bookDetail,
    };
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

      console.log("🔍 Vyhledávám:", query);

      const response = await searchBooks(query, 10);

      console.log("📚 Nalezeno knih:", response.numFound);
      console.log("📋 Výsledky:", response.docs);

      setSearchResults(response.docs);

      if (response.docs.length === 0) {
        setError("Žádné knihy nebyly nalezeny. Zkuste jiný vyhledávací výraz.");
      }
    } catch (err) {
      console.error("❌ Chyba při vyhledávání:", err);
      setError(
        `Chyba při vyhledávání: ${err instanceof Error ? err.message : "Neznámá chyba"}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = async (book: BookSearch) => {
    console.log("📖 Kliknuto na knihu:", book.title);
    console.log("🔗 Klíč knihy:", book.key);
    console.log("📊 Všechna dostupná data z BookSearch:", book);

    try {
      // Nejdříve zobrazíme základní data z vyhledávání
      const basicBookForModal = convertBookSearchToBook(book);
      setSelectedBook(basicBookForModal);
      setIsModalOpen(true);

      // Pak se pokusíme načíst detailní data pomocí fetchDetail
      // Pokusíme se extrahovat ISBN nebo jiný identifikátor z klíče
      const olid = book.key.replace("/works/", "").replace("/books/", "");

      console.log("🔍 Načítám detailní data pro:", olid);

      try {
        const detailResponse = await fetchDetail(olid);
        console.log("� Detailní data z API:", detailResponse);

        // Pokud se podařilo načíst detailní data, aktualizujeme modal
        const detailKey = Object.keys(detailResponse)[0];
        if (detailKey && detailResponse[detailKey]) {
          const detailedBookDetail = validateBookDetail(
            detailResponse[detailKey]
          );
          const enhancedBook: Book = {
            id: book.key,
            isRead: false,
            detail: detailedBookDetail,
          };

          console.log("✨ Aktualizováno s detailními daty:", enhancedBook);
          setSelectedBook(enhancedBook);
        }
      } catch (detailError) {
        console.warn(
          "⚠️ Nepodařilo se načíst detailní data, používám základní:",
          detailError
        );
        // Necháme základní data z vyhledávání
      }
    } catch (error) {
      console.error("❌ Chyba při otevírání modalu:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleUpdateBook = (id: string, value: Partial<UserBookRow>) => {
    console.log("📝 Aktualizace knihy:", id, value);
    // Zde můžete přidat logiku pro uložení změn
    // Například do localStorage nebo API
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
      {isMounted && hasSearched && !loading && !error && (
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Výsledky vyhledávání ({searchResults.length} nalezeno):
          </Typography>

          <List sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
            {searchResults.map((book, index) => (
              <Box key={`${book.key}-${index}`}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleBookClick(book)}
                    sx={{
                      p: 2,
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}
                  >
                    {/* Obrázek knihy */}
                    {book.cover_i && getCoverUrl(book.cover_i) && (
                      <Box
                        component="img"
                        src={getCoverUrl(book.cover_i)!}
                        alt={book.title}
                        sx={{
                          width: 60,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 1,
                          mr: 2,
                          flexShrink: 0,
                        }}
                        onError={(e) => {
                          // Skrýt obrázek pokud se nepodaří načíst
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )}

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="div" gutterBottom>
                        {book.title}
                      </Typography>

                      {book.author_name && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                          component="div"
                        >
                          Autor: {book.author_name.join(", ")}
                        </Typography>
                      )}

                      {book.first_publish_year && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                          component="div"
                        >
                          Rok vydání: {book.first_publish_year}
                        </Typography>
                      )}

                      {book.publisher && book.publisher.length > 0 && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                          component="div"
                        >
                          Vydavatel: {book.publisher[0]}
                        </Typography>
                      )}

                      {book.subject && book.subject.length > 0 && (
                        <Stack
                          direction="row"
                          flexWrap="wrap"
                          gap={0.5}
                          sx={{ mt: 1 }}
                        >
                          {book.subject.slice(0, 3).map((subject, subIndex) => (
                            <Chip
                              key={subIndex}
                              label={subject}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: "0.7rem" }}
                            />
                          ))}
                          {book.subject.length > 3 && (
                            <Chip
                              label={`+${book.subject.length - 3} další`}
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
            ))}
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

      {/* Modal Detail */}
      {selectedBook && (
        <ModalDetail
          dialogOpen={isModalOpen}
          handleCloseDialog={handleCloseModal}
          book={selectedBook}
          updateRow={handleUpdateBook}
        />
      )}
    </>
  );
};
