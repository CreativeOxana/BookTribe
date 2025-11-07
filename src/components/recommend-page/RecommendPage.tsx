"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useMemo } from "react";
import { useBookDetails } from "@/components/recommend-page/hooks/useBookDetails";
import { useUserBookRows } from "@/components/recommend-page/hooks/useUserBookRows";
import { getBooks } from "@/utils/getBooks";
import { Layout } from "../layout/Layout";
import { BookList } from "./components/book-list/BookList";
import { BookSearch } from "@/types/typesSearch";

export const RecommendPage = () => {
  const { userBookRows, createRow, updateRow } = useUserBookRows();
  const booklist = useMemo(() => Object.keys(userBookRows), [userBookRows]);
  const { bookDetails, loading } = useBookDetails(booklist);
  const books = getBooks(userBookRows, bookDetails);

  // Callback funkce pro přidání knihy do "Chci přečíst"
  const handleAddToWantToRead = (book: BookSearch) => {
    console.log("📚 Přidávám knihu do 'Chci přečíst':", book.title);
    // TODO: Implementovat přidání do uživatelského profilu
    // Možné řešení: 
    // 1. Převést BookSearch na BookDetail formát
    // 2. Přidat do ProfilePage stavu pomocí context nebo localStorage
    // 3. Zobrazit notifikaci o úspěchu
    
    // Dočasně pouze log
    alert(`Kniha "${book.title}" byla přidána do seznamu "Chci přečíst"!`);
  };

  // Callback funkce pro přidání knihy do "Přečteno"
  const handleAddToRead = (book: BookSearch) => {
    console.log("✅ Označuji knihu jako přečtenou:", book.title);
    // TODO: Implementovat přidání do uživatelského profilu
    // Podobně jako výše, ale do "readBooks" seznamu
    
    // Dočasně pouze log
    alert(`Kniha "${book.title}" byla označena jako přečtená!`);
  };

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
          Objevte nové knihy
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

        <BookList 
          books={books} 
          createRow={createRow} 
          updateRow={updateRow}
          onAddToWantToRead={handleAddToWantToRead}
          onAddToRead={handleAddToRead}
        />
      </Box>
    </Layout>
  );
};
