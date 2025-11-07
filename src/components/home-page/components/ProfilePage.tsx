"use client";

import { Add, BookmarkAdd, MenuBook, Search } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Fade,
  LinearProgress,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { searchBooks } from "@/fetch/fetchSearchMain";
import { UserProfile, WantToReadBook } from "@/types/typesProfile";
import { BookShelfCard } from "./BookShelfCard";

interface ProfilePageProps {
  userId?: string;
}

export const ProfilePage = ({ userId = "current-user" }: ProfilePageProps) => {
  const [profile, setProfile] = useState<UserProfile>({
    id: userId,
    name: "Anna Čtenářka",
    avatar: "https://via.placeholder.com/150x150/4CAF50/white?text=AC",
    bio: "Miluji fantasy a sci-fi knihy. Můj cíl je přečíst 50 knih ročně!",
    badges: [
      {
        id: "1",
        name: "Bookworm",
        description: "Přečetl 10 knih",
        icon: "📚",
        color: "#4CAF50",
        earnedAt: new Date("2024-03-15"),
      },
      {
        id: "2",
        name: "Speed Reader",
        description: "Přečetl knihu za méně než 3 dny",
        icon: "⚡",
        color: "#ff5e00ff",
        earnedAt: new Date("2024-05-20"),
      },
      {
        id: "3",
        name: "Reviewer",
        description: "Napsal 5 recenzí",
        icon: "✍️",
        color: "#bda51dff",
        earnedAt: new Date("2024-07-10"),
      },
    ],
    readingGoals: [
      {
        id: "1",
        year: 2024,
        targetBooks: 50,
        currentBooks: 32,
        description: "Můj hlavní cíl pro rok 2025",
      },
    ],
    wantToRead: [
      {
        id: "1",
        bookId: "book1",
        bookDetail: {
          id: "book1",
          title: "Harry Potter a Kámen mudrců",
          authors: { name: "J.K. Rowling" },
          cover: {
            medium: "https://covers.openlibrary.org/b/isbn/0439708184-M.jpg",
            large: "https://covers.openlibrary.org/b/isbn/0439708184-L.jpg",
            small: "https://covers.openlibrary.org/b/isbn/0439708184-S.jpg",
          },
        },
        comment: "Musím si konečně přečíst tuto legendu!",
        priority: "high",
        addedAt: new Date("2024-10-01"),
      },
      {
        id: "2",
        bookId: "book3",
        bookDetail: {
          id: "book3",
          title: "1984",
          authors: { name: "George Orwell" },
          cover: {
            medium: "https://covers.openlibrary.org/b/isbn/0452284236-M.jpg",
            large: "https://covers.openlibrary.org/b/isbn/0452284236-L.jpg",
            small: "https://covers.openlibrary.org/b/isbn/0452284236-S.jpg",
          },
        },
        comment: "Klasika dystopické literatury",
        priority: "medium",
        addedAt: new Date("2024-10-05"),
      },
      {
        id: "3",
        bookId: "book4",
        bookDetail: {
          id: "book4",
          title: "Malý princ",
          authors: { name: "Antoine de Saint-Exupéry" },
          cover: {
            medium: "https://covers.openlibrary.org/b/isbn/0156012197-M.jpg",
            large: "https://covers.openlibrary.org/b/isbn/0156012197-L.jpg",
            small: "https://covers.openlibrary.org/b/isbn/0156012197-S.jpg",
          },
        },
        comment: "Možná jednou, když budu mít čas",
        priority: "low",
        addedAt: new Date("2024-10-10"),
      },
    ],
    readBooks: [
      {
        id: "1",
        bookId: "book2",
        bookDetail: {
          id: "book2",
          title: "Alchymista",
          authors: { name: "Paulo Coelho" },
          cover: {
            medium: "https://covers.openlibrary.org/b/isbn/0062315005-M.jpg",
            large: "https://covers.openlibrary.org/b/isbn/0062315005-L.jpg",
            small: "https://covers.openlibrary.org/b/isbn/0062315005-S.jpg",
          },
        },
        readAt: new Date("2024-09-15"),
        rating: 5,
        notes: [
          {
            id: "note1",
            bookId: "book2",
            note: "Nádherný příběh o hledání vlastní životní cesty. Coelhova filozofie je inspirativní.",
            rating: 5,
            createdAt: new Date("2024-09-15"),
            updatedAt: new Date("2024-09-15"),
          },
        ],
        photos: [
          {
            id: "photo1",
            bookId: "book2",
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
            caption: "Čtení při západu slunce - perfektní atmosféra pro tuto knihu",
            createdAt: new Date("2024-09-10"),
          },
        ],
      },
    ],
    joinedAt: new Date("2023-01-15"),
  });

  const [activeTab, setActiveTab] = useState(0);
  const [searchFilter, setSearchFilter] = useState("");

  // Načítání skutečných knih z Open Library - dočasně vypnuto
  useEffect(() => {
    const loadRealBooks = async () => {
      // Temporarily disabled to use static test data with working covers
      return;
      try {
        console.log("🔍 Načítám skutečné knihy z Open Library...");

        // Načteme Harry Potter
        console.log("📚 Hledám Harry Potter...");
        const harryPotterResult = await searchBooks("Harry Potter Philosopher Stone", 1);
        const harryPotter = harryPotterResult.docs[0];
        console.log("✅ Harry Potter nalezen:", harryPotter);

        // Načteme Alchymista
        console.log("📚 Hledám Alchymista...");
        const alchemistResult = await searchBooks("Alchemist Paulo Coelho", 1);
        const alchemist = alchemistResult.docs[0];
        console.log("✅ Alchemist nalezen:", alchemist);

        if (harryPotter) {
          setProfile((prev) => ({
            ...prev,
            wantToRead: [
              {
                id: "1",
                bookId: "book1",
                bookDetail: {
                  id: "book1",
                  title: harryPotter.title,
                  authors: { name: harryPotter.author_name?.[0] || "J.K. Rowling" },
                  cover: {
                    medium: harryPotter.cover_i
                      ? `https://covers.openlibrary.org/b/id/${harryPotter.cover_i}-M.jpg`
                      : "https://books.google.com/books/content?id=wrOQLV6EK-wC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
                    large: harryPotter.cover_i
                      ? `https://covers.openlibrary.org/b/id/${harryPotter.cover_i}-L.jpg`
                      : "https://books.google.com/books/content?id=wrOQLV6EK-wC&printsec=frontcover&img=1&zoom=2&source=gbs_api",
                    small: harryPotter.cover_i
                      ? `https://covers.openlibrary.org/b/id/${harryPotter.cover_i}-S.jpg`
                      : "https://books.google.com/books/content?id=wrOQLV6EK-wC&printsec=frontcover&img=1&zoom=0&source=gbs_api",
                  },
                },
                comment: "Musím si konečně přečíst tuto legendu!",
                priority: "high",
                addedAt: new Date("2024-10-01"),
              },
            ],
          }));
        }

        if (alchemist) {
          setProfile((prev) => ({
            ...prev,
            readBooks: [
              {
                id: "1",
                bookId: "book2",
                bookDetail: {
                  id: "book2",
                  title: alchemist.title,
                  authors: { name: alchemist.author_name?.[0] || "Paulo Coelho" },
                  cover: {
                    medium: alchemist.cover_i
                      ? `https://covers.openlibrary.org/b/id/${alchemist.cover_i}-M.jpg`
                      : "https://books.google.com/books/content?id=FzVjBgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
                    large: alchemist.cover_i
                      ? `https://covers.openlibrary.org/b/id/${alchemist.cover_i}-L.jpg`
                      : "https://books.google.com/books/content?id=FzVjBgAAQBAJ&printsec=frontcover&img=1&zoom=2&source=gbs_api",
                    small: alchemist.cover_i
                      ? `https://covers.openlibrary.org/b/id/${alchemist.cover_i}-S.jpg`
                      : "https://books.google.com/books/content?id=FzVjBgAAQBAJ&printsec=frontcover&img=1&zoom=0&source=gbs_api",
                  },
                },
                readAt: new Date("2024-09-15"),
                rating: 5,
                notes: [
                  {
                    id: "note1",
                    bookId: "book2",
                    note: "Nádherný příběh o hledání vlastní životní cesty. Coelhova filozofie je inspirativní.",
                    rating: 5,
                    createdAt: new Date("2024-09-15"),
                    updatedAt: new Date("2024-09-15"),
                  },
                ],
                photos: [
                  {
                    id: "photo1",
                    bookId: "book2",
                    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
                    caption: "Čtení při západu slunce - perfektní atmosféra pro tuto knihu",
                    createdAt: new Date("2024-09-10"),
                  },
                ],
              },
            ],
          }));
        }

        console.log("📖 Knihy úspěšně načteny!", {
          harryPotter: harryPotter?.title,
          alchemist: alchemist?.title,
          harryPotterCover: harryPotter?.cover_i,
          alchemistCover: alchemist?.cover_i,
        });
      } catch (error) {
        console.error("❌ Chyba při načítání knih z Open Library:", error);
        console.log("🔄 Použijí se fallback obrázky z Unsplash");
      }
    };

    loadRealBooks();
  }, []);

  const currentGoal = profile.readingGoals[0];
  const progressPercentage = currentGoal ? (currentGoal.currentBooks / currentGoal.targetBooks) * 100 : 0;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Handler funkce pro BookShelfCard

  const handleDeleteWantToRead = (itemId: string) => {
    setProfile((prev) => ({
      ...prev,
      wantToRead: prev.wantToRead.filter((item) => item.id !== itemId),
    }));
  };

  const handleMarkAsRead = (item: WantToReadBook) => {
    // Přesun z "Chci přečíst" do "Přečtené"
    const newReadBook = {
      id: Date.now().toString(),
      bookId: item.bookId,
      bookDetail: item.bookDetail,
      readAt: new Date(),
      rating: undefined,
      notes: [],
      photos: [],
    };

    setProfile((prev) => ({
      ...prev,
      wantToRead: prev.wantToRead.filter((i) => i.id !== item.id),
      readBooks: [...prev.readBooks, newReadBook],
    }));
  };

  const handleDeleteReadBook = (bookId: string) => {
    setProfile((prev) => ({
      ...prev,
      readBooks: prev.readBooks.filter((book) => book.id !== bookId),
    }));
  };

  const handleAddNote = (bookId: string) => {
    console.log("Add note to book:", bookId);
    // Poznámka se přidává v rozbalovací sekci BookShelfCard
  };

  const handleAddPhoto = (bookId: string) => {
    console.log("Add photo to book:", bookId);
    // TODO: Implementovat upload fotografií
  };

  const handleRatingChange = (bookId: string, rating: number) => {
    setProfile((prev) => ({
      ...prev,
      readBooks: prev.readBooks.map((book) => (book.id === bookId ? { ...book, rating } : book)),
    }));
  };

  const filteredReadBooks = profile.readBooks.filter(
    (book) =>
      book.bookDetail.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      book.bookDetail.authors?.name.toLowerCase().includes(searchFilter.toLowerCase()),
  );

  return (
    <>
      {/* Profile Header */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          background: "linear-gradient(135deg, #023d0fff 0%, #107c22ff 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            animation: "pulse 2s infinite",
          }}
        />

        <Box
          sx={{
            display: "flex",
            gap: 4,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Avatar
            src={profile.avatar}
            sx={{
              width: 120,
              height: 120,
              border: "4px solid white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            {profile.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>

          <Box sx={{ flex: 1, minWidth: 300 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {profile.name}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
              {profile.bio}
            </Typography>

            {/* Badges */}
            <Stack direction="row" spacing={1} flexWrap="wrap" mb={3}>
              {profile.badges.map((badge) => (
                <Chip
                  key={badge.id}
                  icon={<span style={{ fontSize: "1.2em" }}>{badge.icon}</span>}
                  label={badge.name}
                  sx={{
                    backgroundColor: badge.color,
                    color: "white",
                    fontWeight: "bold",
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
              ))}
            </Stack>

            {/* Reading Goal Progress */}
            {currentGoal && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Čtenářský cíl {currentGoal.year}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(progressPercentage, 100)}
                      sx={{
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: "rgba(255,255,255,0.3)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#4CAF50",
                          borderRadius: 6,
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                    {currentGoal.currentBooks}/{currentGoal.targetBooks}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {progressPercentage.toFixed(1)}% splněno • Zbývá {currentGoal.targetBooks - currentGoal.currentBooks}{" "}
                  knih
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Book Search Integration
      <Paper sx={{ p: 3, mt: 4, mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🔍 Najít nové knihy
        </Typography>
        <Box sx={{ mt: 2 }}>
          <BookSearchCard />
        </Box>
      </Paper> */}

      {/* Tabs Navigation */}
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
          <Tab icon={<BookmarkAdd />} label="Chci přečíst" iconPosition="start" />
          <Tab icon={<MenuBook />} label="Přečtené knihy" iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Fade in={activeTab === 0}>
          <Box>
            {/* Want to Read Section */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  📚 Knihy k přečtení
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => console.log("TODO: Přidat vyhledávání knih")}
                  sx={{ borderRadius: 3 }}
                >
                  Přidat knihu
                </Button>
              </Box>

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
                }}
              >
                {profile.wantToRead.map((item) => (
                  <BookShelfCard
                    key={item.id}
                    book={item}
                    status="want-to-read"
                    onDelete={() => handleDeleteWantToRead(item.id)}
                    onAddNote={() => handleAddNote(item.bookId)}
                    onMarkAsRead={() => handleMarkAsRead(item)}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Fade>
      )}

      {activeTab === 1 && (
        <Fade in={activeTab === 1}>
          <Box>
            {/* Read Books Section */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  📖 Přečtené knihy ({profile.readBooks.length})
                </Typography>
                <TextField
                  placeholder="Hledat v knihách..."
                  variant="outlined"
                  size="small"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
                  }}
                  sx={{ width: 300 }}
                />
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  },
                  gap: 3,
                }}
              >
                {filteredReadBooks.map((book) => (
                  <BookShelfCard
                    key={book.id}
                    book={book}
                    status="read"
                    onDelete={() => handleDeleteReadBook(book.id)}
                    onAddNote={() => handleAddNote(book.bookId)}
                    onAddPhoto={() => handleAddPhoto(book.bookId)}
                    onRatingChange={(rating) => handleRatingChange(book.id, rating)}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Fade>
      )}

      <style jsx global>{`
        @keyframes pulse {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
          }
        }
      `}</style>
    </>
  );
};
