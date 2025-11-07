import { Alert, Box, Stack, Chip, Typography, Tabs, Tab, CircularProgress, Paper, Button, Tooltip, Collapse, Divider } from "@mui/material";
import { BookmarkAdd, CheckCircle, Info } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Book, UserBookRow } from "@/types/typesDetail";
import { ModalDetail } from "./components/ModalDetail";
import { searchBooksByGenre } from "@/fetch/fetchGenre";
import { searchTopBooks } from "@/fetch/fetchTopBooks";
import { BookSearch } from "@/types/typesSearch";

// Typy pro kategorie
type BookCategory = "bestsellers" | "new-releases" | "classics" | "award-winners" | "trending" | "young-adult";
type Genre = "fantasy" | "romance" | "mystery" | "science-fiction" | "horror" | "biography" | "history";

export const BookList = ({
  updateRow,
  onAddToWantToRead,
  onAddToRead,
}: {
  books: Book[];
  createRow: (id: string) => void;
  updateRow: (id: string, value: Partial<UserBookRow>) => void;
  onAddToWantToRead?: (book: BookSearch) => void;
  onAddToRead?: (book: BookSearch) => void;
}) => {

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<Genre>("fantasy");
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>("bestsellers");
  const [genreBooks, setGenreBooks] = useState<BookSearch[]>([]);
  const [topBooks, setTopBooks] = useState<BookSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedBook, setExpandedBook] = useState<string | null>(null);

  // Definice žánrů
  const genres: { key: Genre; label: string; emoji: string }[] = [
    { key: "fantasy", label: "Fantasy", emoji: "🐉" },
    { key: "romance", label: "Romance", emoji: "💕" },
    { key: "mystery", label: "Detektivky", emoji: "🔍" },
    { key: "science-fiction", label: "Sci-Fi", emoji: "🚀" },
    { key: "horror", label: "Horror", emoji: "👻" },
    { key: "biography", label: "Biografie", emoji: "👤" },
    { key: "history", label: "Historie", emoji: "📜" },
  ];

  // Definice TOP kategorií
  const topCategories: { key: BookCategory; label: string; emoji: string }[] = [
    { key: "bestsellers", label: "Bestsellery", emoji: "🏆" },
    { key: "new-releases", label: "Novinky 2024", emoji: "✨" },
    { key: "classics", label: "Klasiky", emoji: "📚" },
    { key: "award-winners", label: "Oceněné knihy", emoji: "🥇" },
    { key: "trending", label: "Trending", emoji: "🔥" },
    { key: "young-adult", label: "Young Adult", emoji: "🌟" },
  ];

  // Načtení knih podle žánru
  const loadGenreBooks = async (genre: Genre) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchBooksByGenre(genre, 15);
      setGenreBooks(response.docs || []);
    } catch (err) {
      setError(`Chyba při načítání knih žánru ${genre}: ${err instanceof Error ? err.message : "Neznámá chyba"}`);
      setGenreBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // Načtení TOP knih podle kategorie
  const loadTopBooks = async (category: BookCategory) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchTopBooks(category, 15);
      setTopBooks(response.docs || []);
    } catch (err) {
      setError(`Chyba při načítání TOP knih ${category}: ${err instanceof Error ? err.message : "Neznámá chyba"}`);
      setTopBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // Načtení při změně žánru
  useEffect(() => {
    if (activeTab === 0) {
      loadGenreBooks(selectedGenre);
    }
  }, [selectedGenre, activeTab]);

  // Načtení při změně TOP kategorie
  useEffect(() => {
    if (activeTab === 1) {
      loadTopBooks(selectedCategory);
    }
  }, [selectedCategory, activeTab]);

  // Načtení výchozích knih při první inicializaci
  useEffect(() => {
    // Načti fantasy knihy hned při prvním načtení
    loadGenreBooks("fantasy");
  }, []);



  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedBook(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleGenreChange = (genre: Genre) => {
    setSelectedGenre(genre);
  };

  const handleCategoryChange = (category: BookCategory) => {
    setSelectedCategory(category);
  };

  // Zpracování přidání knihy do "Chci přečíst"
  const handleAddToWantToRead = (book: BookSearch) => {
    console.log("📚 Přidávám do 'Chci přečíst':", book.title);
    if (onAddToWantToRead) {
      onAddToWantToRead(book);
    }
    // TODO: Zobrazit notifikaci o úspěšném přidání
  };

  // Zpracování přidání knihy do "Přečteno"
  const handleAddToRead = (book: BookSearch) => {
    console.log("✅ Označuji jako přečtené:", book.title);
    if (onAddToRead) {
      onAddToRead(book);
    }
    // TODO: Zobrazit notifikaci o úspěšném přidání
  };

  // Toggle detail knihy
  const handleToggleDetail = (bookKey: string) => {
    setExpandedBook(expandedBook === bookKey ? null : bookKey);
  };

  // Komponenta pro zobrazení knih z API
  const renderApiBooks = (booksData: BookSearch[]) => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 3,
        justifyItems: "center",
        mb: 4,
        px: 1,
        maxWidth: "1400px",
        mx: "auto",
      }}
    >
      {booksData.map((book, index) => {
        const coverUrl = book.cover_i 
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://via.placeholder.com/150x200/e0e0e0/757575?text=📚";
        
        const isExpanded = expandedBook === book.key;
        
        return (
          <Box
            key={`${book.key}-${index}`}
            sx={{
              width: 250,
              minHeight: isExpanded ? "auto" : 480,
              height: isExpanded ? "auto" : 480,
              border: "2px solid #2E7D32",
              borderRadius: 2,
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
              "&:hover": { 
                transform: isExpanded ? "none" : "translateY(-4px)",
                boxShadow: 4
              },
              position: "relative",
              backgroundColor: "#e8f5e8",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                height: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#e8f5e8",
                p: 1,
              }}
            >
              <Box
                component="img"
                src={coverUrl}
                alt={book.title}
                sx={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: 1,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/150x200/e0e0e0/757575?text=📚";
                }}
              />
            </Box>
            <Box sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Text sekce */}
              <Box>
                <Typography 
                  variant="body1" 
                  fontWeight="bold"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    mb: 1,
                    minHeight: "4.5em",
                  }}
                >
                  {book.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    mb: 1,
                  }}
                >
                  {book.author_name?.[0] || "Neznámý autor"}
                </Typography>
                {book.first_publish_year && (
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
                    Rok vydání: {book.first_publish_year}
                  </Typography>
                )}
              </Box>
              
              {/* Flexibilní prostor */}
              <Box sx={{ flexGrow: 1 }} />
              
              {/* Akční tlačítka - fixně na spodku */}
              <Box>
                <Stack direction="column" spacing={1} alignItems="center">
                  {/* Hlavní tlačítka */}
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title="Přidat do 'Chci přečíst'">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<BookmarkAdd />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToWantToRead(book);
                        }}
                        sx={{
                          color: "#2E7D32",
                          borderColor: "#2E7D32",
                          "&:hover": {
                            borderColor: "#2E7D32",
                            backgroundColor: "rgba(46, 125, 50, 0.1)",
                          }
                        }}
                      >
                        Chci
                      </Button>
                    </Tooltip>
                    
                    <Tooltip title="Označit jako přečtené">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<CheckCircle />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToRead(book);
                        }}
                        sx={{
                          color: "#2196F3",
                          borderColor: "#2196F3",
                          "&:hover": {
                            borderColor: "#2196F3",
                            backgroundColor: "rgba(33, 150, 243, 0.1)",
                          }
                        }}
                      >
                        Přečteno
                      </Button>
                    </Tooltip>
                  </Stack>
                  
                  {/* Detail tlačítko - větší a výraznější */}
                  <Tooltip title={isExpanded ? "Zavřít detail" : "Zobrazit detail knihy"}>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Info />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleDetail(book.key);
                      }}
                      sx={{ 
                        backgroundColor: isExpanded ? "#2E7D32" : "#757575",
                        color: "white",
                        fontSize: "0.8rem",
                        minWidth: 110,
                        height: "32px",
                        "&:hover": {
                          backgroundColor: isExpanded ? "#1B5E20" : "#424242",
                        }
                      }}
                    >
                      {isExpanded ? "Zavřít" : "Detail"}
                    </Button>
                  </Tooltip>
                </Stack>
              </Box>
            </Box>

            {/* Expandovatelný detail */}
            <Collapse in={isExpanded} timeout={300}>
              <Box sx={{ p: 2, backgroundColor: "#f5f5f5", borderTop: "1px solid #e0e0e0" }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "#2E7D32" }}>
                  📖 Detail knihy
                </Typography>
                
                <Divider sx={{ mb: 2 }} />
                
                <Stack spacing={1}>
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Název:
                    </Typography>
                    <Typography variant="body2">
                      {book.title}
                    </Typography>
                  </Box>

                  {book.author_name && book.author_name.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {book.author_name.length > 1 ? "Autoři:" : "Autor:"}
                      </Typography>
                      <Typography variant="body2">
                        {book.author_name.join(", ")}
                      </Typography>
                    </Box>
                  )}

                  {book.first_publish_year && (
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        První vydání:
                      </Typography>
                      <Typography variant="body2">
                        {book.first_publish_year}
                      </Typography>
                    </Box>
                  )}

                  {book.language && book.language.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Jazyky:
                      </Typography>
                      <Typography variant="body2">
                        {book.language.join(", ")}
                      </Typography>
                    </Box>
                  )}

                  {book.edition_count && (
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Počet vydání:
                      </Typography>
                      <Typography variant="body2">
                        {book.edition_count}
                      </Typography>
                    </Box>
                  )}

                  {book.ebook_access && (
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Dostupnost e-knihy:
                      </Typography>
                      <Typography variant="body2">
                        {book.ebook_access === "public" ? "✅ Veřejně dostupná" : 
                         book.ebook_access === "borrowable" ? "📚 Půjčovatelná" : 
                         book.ebook_access === "printdisabled" ? "♿ Pro zrakově postižené" : 
                         book.ebook_access}
                      </Typography>
                    </Box>
                  )}

                  {book.has_fulltext && (
                    <Box>
                      <Typography variant="body2" sx={{ color: "#2E7D32", fontWeight: "bold" }}>
                        📄 Plný text dostupný
                      </Typography>
                    </Box>
                  )}

                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Open Library ID:
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "0.8rem" }}>
                      {book.key}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Collapse>
          </Box>
        );
      })}
    </Box>
  );

  return (
    <>
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              fontWeight: "bold",
              fontSize: "1rem",
            },
          }}
        >
          <Tab label="🎭 Podle žánrů" />
          <Tab label="🏆 TOP výběry" />
        </Tabs>
      </Paper>

      {/* Tab 0: Knihy podle žánrů */}
      {activeTab === 0 && (
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            🎭 Knihy podle žánrů
          </Typography>
          
          {/* Žánrové štítky */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>Vyberte žánr:</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {genres.map((genre) => (
                <Chip
                  key={genre.key}
                  label={`${genre.emoji} ${genre.label}`}
                  clickable
                  variant={selectedGenre === genre.key ? "filled" : "outlined"}
                  color={selectedGenre === genre.key ? "success" : "default"}
                  onClick={() => handleGenreChange(genre.key)}
                  sx={{ 
                    mb: 1,
                    ...(selectedGenre === genre.key && {
                      backgroundColor: "#2E7D32",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#1B5E20",
                      }
                    })
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Loading a Error stavy */}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Zobrazení knih žánru */}
          {!loading && !error && genreBooks.length > 0 && renderApiBooks(genreBooks)}
          
          {!loading && !error && genreBooks.length === 0 && activeTab === 0 && (
            <Alert severity="info">Pro vybraný žánr nebyly nalezeny žádné knihy.</Alert>
          )}
        </Box>
      )}

      {/* Tab 1: TOP výběry */}
      {activeTab === 1 && (
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
            🏆 TOP výběry knih
          </Typography>
          
          {/* TOP kategorie */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>Vyberte kategorii:</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {topCategories.map((category) => (
                <Chip
                  key={category.key}
                  label={`${category.emoji} ${category.label}`}
                  clickable
                  variant={selectedCategory === category.key ? "filled" : "outlined"}
                  color={selectedCategory === category.key ? "success" : "default"}
                  onClick={() => handleCategoryChange(category.key)}
                  sx={{ 
                    mb: 1,
                    ...(selectedCategory === category.key && {
                      backgroundColor: "#2E7D32",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#1B5E20",
                      }
                    })
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Loading a Error stavy */}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Zobrazení TOP knih */}
          {!loading && !error && topBooks.length > 0 && renderApiBooks(topBooks)}
          
          {!loading && !error && topBooks.length === 0 && activeTab === 1 && (
            <Alert severity="info">Pro vybranou kategorii nebyly nalezeny žádné knihy.</Alert>
          )}
        </Box>
      )}

      {/* Modal pro detail knihy */}
      {selectedBook && (
        <ModalDetail
          dialogOpen={dialogOpen}
          handleCloseDialog={handleCloseDialog}
          book={selectedBook}
          updateRow={updateRow}
        />
      )}
    </>
  );
};
