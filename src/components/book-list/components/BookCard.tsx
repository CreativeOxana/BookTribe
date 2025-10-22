"use client";
import { BookDetail } from "@/types/types";
import { Typography, Card, Box, CardContent, CardMedia } from "@mui/material";

type Props = {
  book: BookDetail;
  onClick?: () => void; // Volitelný onClick handler
};

export const BookCard = ({ book, onClick }: Props) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Card
      sx={{
        height: 350, // Fixní výška pro grid
        width: "100%",
        maxWidth: 250, // Maximální šířka pro grid
        display: "flex",
        flexDirection: "column",
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": onClick
          ? {
              transform: "translateY(-4px)",
              boxShadow: 6,
            }
          : {},
        boxShadow: 2,
      }}
      onClick={handleCardClick}
    >
      {/* Obrázek knihy - kompaktní */}
      <Box
        sx={{
          height: 200, // Fixní výška pro obrázek
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #e9ecef",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "auto",
            height: "100%",
            maxWidth: "90%",
            objectFit: "contain",
            borderRadius: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
          image={
            book.cover?.medium ||
            book.cover?.large ||
            book.cover?.small ||
            "https://via.placeholder.com/150x200/e0e0e0/757575?text=📚"
          }
          alt={book.title}
        />
      </Box>

      {/* Kompaktní obsah */}
      <CardContent
        sx={{
          flexGrow: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 150, // Fixní výška pro obsah
          overflow: "hidden",
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            component="h4"
            gutterBottom
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: 1.3,
              fontWeight: "bold",
              minHeight: "2.6em",
              fontSize: "0.9rem",
            }}
          >
            {book.title}
          </Typography>

          {book.authors && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: "0.75rem",
              }}
            >
              {book.authors.name}
            </Typography>
          )}
        </Box>

        {book.publish_date && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontSize: "0.7rem",
              mt: 1,
            }}
          >
            {book.publish_date}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
