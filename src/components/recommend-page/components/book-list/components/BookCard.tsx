"use client";

import { Box, Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import { Book } from "@/types/types";

type Props = {
  book: Book;
  onClick?: () => void;
};

export const BookCard = ({
  book: {
    detail: { title, cover, authors, publish_date },
    isRead,
  },
  onClick,
}: Props) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Card
      sx={{
        height: 350,
        width: "100%",
        maxWidth: 250,
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
          height: 200,
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
            cover?.medium || cover?.large || cover?.small || "https://via.placeholder.com/150x200/e0e0e0/757575?text=📚"
          }
          alt={title}
        />
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 150,
          overflow: "hidden",
        }}
      >
        <Box>
          <Chip label={isRead ? "Přečteno" : "Nepřečteno"} color={isRead ? "success" : "error"} />
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
            {title}
          </Typography>

          {authors && (
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
              {authors.name}
            </Typography>
          )}
        </Box>

        {publish_date && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontSize: "0.7rem",
              mt: 1,
            }}
          >
            {publish_date}
          </Typography>
        )}
        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 1, mt: 2, justifyContent: "center" }}>
          <Chip label="Přidat" color="primary" icon={<span>➕</span>} />
          <Chip label="Odebrat" color="error" icon={<span>➖</span>} />
        </Box>
      </CardContent>
    </Card>
  );
};
