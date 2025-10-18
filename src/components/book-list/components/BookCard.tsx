"use client";
import { BookSearch } from "@/types/types";
import {
  Typography,
  Card,
  Box,
  CardContent,
  CardMedia,
  Stack,
  Grid,
  Chip,
} from "@mui/material";

type Props = {
  book: BookSearch;
};

// export const BookCard = ({ book: { title, author_name, cover_i } }: Props) => {
export const BookCard = ({ book }: Props) => {
  return (
    <Card sx={{ maxWidth: 800, mx: "auto", boxShadow: 3 }}>
      <Grid
        container
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
      >
        {/* Obrázek knihy */}
        <Box
          sx={{
            width: { xs: "100%", md: "33%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
            minHeight: { xs: 350, md: 450 },
            backgroundColor: "#f5f5f5",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            image={
              book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                : "https://via.placeholder.com/300x400/e0e0e0/757575?text=📚+No+Cover"
            }
            alt={book.title}
          />
        </Box>

        {/* Detaily knihy */}
        <Box sx={{ flex: 1 }}>
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h4" component="h4" gutterBottom>
                {book.title}
              </Typography>

              {book.author_name && book.author_name.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Autor(i):
                  </Typography>
                  <Typography variant="body1">
                    {book.author_name.slice(0, 3).join(", ")}
                  </Typography>
                </Box>
              )}

              {/* Vydavatel - zobrazí i když je jen string */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Vydavatel:
                </Typography>
                <Typography variant="body1">
                  {book.publisher && Array.isArray(book.publisher)
                    ? book.publisher.slice(0, 2).join(", ")
                    : book.publisher || "Není k dispozici"}
                </Typography>
              </Box>

              {/* První vydání */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  První vydání:
                </Typography>
                <Typography variant="body1">
                  {book.first_publish_year || "Není k dispozici"}
                </Typography>
              </Box>

              {/* Počet stran */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Počet stran:
                </Typography>
                <Typography variant="body1">
                  {book.number_of_pages_median || "Není k dispozici"}
                </Typography>
              </Box>

              {/* Jazyky */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Jazyky:
                </Typography>
                <Typography variant="body1">
                  {book.language &&
                  Array.isArray(book.language) &&
                  book.language.length > 0
                    ? book.language.slice(0, 5).join(", ")
                    : "Není k dispozici"}
                </Typography>
              </Box>

              {/* Témata/žánry */}
              {book.subject &&
                Array.isArray(book.subject) &&
                book.subject.length > 0 && (
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ mb: 1 }}
                    >
                      Témata/Žánry:
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {book.subject.slice(0, 10).map((subject, index) => (
                        <Chip
                          key={index}
                          label={subject}
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Stack>
                  </Box>
                )}

              {/* ISBN */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  ISBN:
                </Typography>
                <Typography variant="body2">
                  {book.isbn && Array.isArray(book.isbn) && book.isbn.length > 0
                    ? book.isbn[0]
                    : "Není k dispozici"}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Box>
      </Grid>
    </Card>
  );
};
