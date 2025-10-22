import { fetchDetail } from "@/fetch/fetchDetail";
import { BookDetail } from "@/types/types";
import { useEffect, useState } from "react";
import { BookCard } from "./components/BookCard";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const BookList = () => {
  const booklist = [
    9780061120084, // To Kill a Mockingbird
    9780747532699, // Harry Potter (UK edition)
    9780451524935, // 1984
    9780062315007, // The Alchemist
    9780544003415, // The Hobbit
  ];
  const [books, setBooks] = useState<BookDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookDetail | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleBookClick = (book: BookDetail) => {
    setSelectedBook(book);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedBook(null);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const bookPromises = booklist.map(async (isbn) => {
          try {
            console.log(`🔍 Začínám načítat ISBN: ${isbn}`);
            const data = await fetchDetail(isbn);
            console.log(`📚 API odpověď pro ${isbn}:`, data);
            console.log(`📝 Keys v odpovědi:`, Object.keys(data));
            console.log(`📝 Values count:`, Object.values(data).length);

            if (data && Object.values(data).length > 0) {
              const bookData = Object.values(data)[0] as any;
              console.log(`📊 Struktura dat pro ${isbn}:`, bookData);

              if (!bookData.title) {
                console.warn(`⚠️ Kniha ${isbn} nemá title:`, bookData);
                return null;
              }

              const convertedBook: BookDetail = {
                title: bookData.title || "Neznámý název",
                authors:
                  Array.isArray(bookData.authors) && bookData.authors.length > 0
                    ? { name: bookData.authors[0].name }
                    : undefined,
                publishers:
                  Array.isArray(bookData.publishers) &&
                  bookData.publishers.length > 0
                    ? { name: bookData.publishers[0].name }
                    : undefined,
                publish_date: bookData.publish_date,
                number_of_pages: bookData.number_of_pages,
                cover: bookData.cover,
                identifiers: bookData.identifiers,
                language: bookData.language,
                key: bookData.key || `ISBN:${isbn}`,
              };

              console.log(`✅ Převedená kniha ${isbn}:`, convertedBook);
              return convertedBook;
            } else {
              console.warn(`⚠️ Prázdná nebo nevalidní odpověď pro ${isbn}`);
              return null;
            }
          } catch (err) {
            console.error(`❌ Chyba při načítání ${isbn}:`, err);
            return null;
          }
        });

        const results = await Promise.all(bookPromises);
        const validBooks = results.filter(
          (book): book is BookDetail => book !== null
        );

        console.log(`📊 Výsledky načítání:`);
        console.log(`📚 Celkem pokusů: ${booklist.length}`);
        console.log(`✅ Úspěšně načteno: ${validBooks.length}`);
        console.log(`❌ Neúspěšně: ${booklist.length - validBooks.length}`);
        console.log(
          `📖 Načtené knihy:`,
          validBooks.map((b) => b.title)
        );

        setBooks(validBooks);

        if (validBooks.length === 0) setError("Žádné knihy nenalezeny");
      } catch (err) {
        setError(
          `Chyba: ${err instanceof Error ? err.message : "Neznámá chyba"}`
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <div>Načítám knihy...</div>;
  if (error) return <div>Chyba: {error}</div>;
  if (books.length === 0) return <div>Žádné knihy</div>;

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: 2,
          justifyItems: "center",
          mb: 4,
          px: 1,
          maxWidth: "1400px",
          mx: "auto",
        }}
      >
        {books.map((book, index) => (
          <BookCard
            key={book.key || index}
            book={book}
            onClick={() => handleBookClick(book)}
          />
        ))}
      </Box>

      {/* Detail Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Detail knihy</Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedBook && (
            <Card sx={{ boxShadow: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", md: "300px" },
                    height: { xs: "300px", md: "400px" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 2,
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      borderRadius: 1,
                    }}
                    image={
                      selectedBook.cover?.large ||
                      selectedBook.cover?.medium ||
                      selectedBook.cover?.small ||
                      "https://via.placeholder.com/300x400/e0e0e0/757575?text=📚"
                    }
                    alt={selectedBook.title}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      <Typography variant="h4">{selectedBook.title}</Typography>
                      <Divider />
                      {selectedBook.authors && (
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Autor:
                          </Typography>
                          <Typography variant="body1">
                            {selectedBook.authors.name}
                          </Typography>
                        </Box>
                      )}
                      {selectedBook.publishers && (
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Vydavatel:
                          </Typography>
                          <Typography variant="body1">
                            {selectedBook.publishers.name}
                          </Typography>
                        </Box>
                      )}
                      {selectedBook.publish_date && (
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Datum vydání:
                          </Typography>
                          <Typography variant="body1">
                            {selectedBook.publish_date}
                          </Typography>
                        </Box>
                      )}
                      {selectedBook.number_of_pages && (
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Počet stran:
                          </Typography>
                          <Typography variant="body1">
                            {selectedBook.number_of_pages}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>
                </Box>
              </Box>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
