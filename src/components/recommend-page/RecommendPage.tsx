"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useMemo } from "react";
import { useBookDetails } from "@/components/recommend-page/hooks/useBookDetails";
import { useUserBookRows } from "@/components/recommend-page/hooks/useUserBookRows";
import { getBooks } from "@/utils/getBooks";
import { Layout } from "../layout/Layout";
import { BookList } from "./components/book-list/BookList";

export const RecommendPage = () => {
  const { userBookRows, createRow, updateRow } = useUserBookRows();
  const booklist = useMemo(() => Object.keys(userBookRows), [userBookRows]);
  const { bookDetails, loading } = useBookDetails(booklist);
  const books = getBooks(userBookRows, bookDetails);

  return (
    <Layout>
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
    </Layout>
  );
};
