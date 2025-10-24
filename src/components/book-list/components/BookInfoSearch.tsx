"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Box,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";
import { fetchDetail } from "@/fetch/fetchDetail";
import { BookDetail } from "@/types/types";

export const BookInfoSearch = () => {
  const [booksDetails, setBooksDetails] = useState<BookDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Seznam 5 populárních knih s jejich ISBN čísly
  const popularISBNs = [
    9780544003415, // The Lord of the Rings
    9780439708180, // Harry Potter and the Sorcerer's Stone
    9780062315007, // The Alchemist
    9780061120084, // To Kill a Mockingbird
    9780743273565, // The Great Gatsby
  ];

  useEffect(() => {
    const fetchBooksWithDetails = async () => {
      try {
        setLoading(true);

        console.log("� Načítám detaily pro 5 knih pomocí fetchDetail...");

        // Načteme detaily pro každé ISBN pomocí fetchDetail
        const detailsPromises = popularISBNs.map(async (isbn: number) => {
          try {
            console.log(`📚 Načítám knihu s ISBN: ${isbn}`);
            const detailResponse = await fetchDetail(isbn);

            // fetchDetail vrací objekt s klíčem "ISBN:číslo"
            const bookKey = `ISBN:${isbn}`;
            const bookDetail = detailResponse[bookKey];

            if (bookDetail) {
              console.log(`✅ Načtena kniha: ${bookDetail.title}`);
              return bookDetail;
            } else {
              console.warn(`⚠️ Kniha s ISBN ${isbn} nenalezena`);
              return null;
            }
          } catch (detailError) {
            console.error(
              `❌ Chyba při načítání knihy s ISBN ${isbn}:`,
              detailError
            );
            return null;
          }
        });

        // Počkáme na všechny detaily a odfiltrujeme null hodnoty
        const details = await Promise.all(detailsPromises);
        const validDetails = details.filter(
          (detail): detail is BookDetail => detail !== null
        );

        console.log("✅ Celkem načteno knih:", validDetails.length);
        setBooksDetails(validDetails);

        if (validDetails.length === 0) {
          setError("Žádné knihy nebyly nalezeny");
        }
      } catch (err) {
        console.error("❌ Chyba při načítání knih:", err);
        setError(
          `Chyba při načítání dat: ${err instanceof Error ? err.message : "Neznámá chyba"}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooksWithDetails();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Načítám detaily knih...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h3"
        gutterBottom
        textAlign="center"
        sx={{ mb: 4 }}
      >
        Populární knihy (fetchDetail API)
      </Typography>

      {/* Grid pro 5 knih vedle sebe */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          },
          gap: 3,
          justifyItems: "center",
        }}
      >
        {booksDetails.map((book, index) => (
          <Box key={book.key || index} sx={{ width: "100%", maxWidth: 280 }}>
            <Card
              sx={{
                height: 550,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 4,
                },
              }}
            >
              {/* Obrázek knihy */}
              <Box
                sx={{
                  height: 300,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                  backgroundColor: "#f8f9fa",
                  borderBottom: "1px solid #e9ecef",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: "auto",
                    height: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                    borderRadius: 1,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                  image={
                    book.cover?.large ||
                    book.cover?.medium ||
                    book.cover?.small ||
                    "https://via.placeholder.com/200x280/e0e0e0/757575?text=📚+No+Cover"
                  }
                  alt={book.title}
                />
              </Box>

              {/* Detaily knihy */}
              <CardContent
                sx={{
                  flexGrow: 1,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: 250,
                  overflow: "hidden",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    component="h4"
                    gutterBottom
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      lineHeight: 1.2,
                      minHeight: "2.4em",
                      fontWeight: "bold",
                    }}
                  >
                    {book.title}
                  </Typography>

                  {book.authors && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontStyle: "italic",
                      }}
                    >
                      Autor: {book.authors.name}
                    </Typography>
                  )}

                  {book.publish_date && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Rok vydání: {book.publish_date}
                    </Typography>
                  )}

                  {book.publishers && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Vydavatel: {book.publishers.name}
                    </Typography>
                  )}

                  {book.number_of_pages && (
                    <Typography variant="body2" color="text.secondary">
                      Stran: {book.number_of_pages}
                    </Typography>
                  )}
                </Box>

                {/* Identifikátory a tagy */}
                {book.identifiers && (
                  <Box sx={{ mt: 1 }}>
                    <Stack direction="row" flexWrap="wrap" gap={0.5}>
                      {book.identifiers.isbn_13 &&
                        book.identifiers.isbn_13.length > 0 && (
                          <Chip
                            label={`ISBN: ${book.identifiers.isbn_13[0].slice(-4)}`}
                            variant="outlined"
                            size="small"
                            sx={{ fontSize: "0.65rem" }}
                          />
                        )}
                      {book.identifiers.goodreads && (
                        <Chip
                          label="Goodreads"
                          variant="outlined"
                          size="small"
                          color="primary"
                          sx={{ fontSize: "0.65rem" }}
                        />
                      )}
                    </Stack>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};
