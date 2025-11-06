"use client";

import { Add, BookmarkAdd, Close, Edit, MenuBook, Search } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  IconButton,
  LinearProgress,
  Paper,
  Rating,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BookNote, UserProfile } from "@/types/typesProfile";

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
          title: "Duna",
          authors: { name: "Frank Herbert" },
          cover: {
            medium: "https://via.placeholder.com/200x300/3F51B5/white?text=DUNA",
          },
        },
        comment: "Slyšela jsem, že je to sci-fi klasika!",
        priority: "high",
        addedAt: new Date("2024-10-01"),
      },
    ],
    readBooks: [
      {
        id: "1",
        bookId: "book2",
        bookDetail: {
          id: "book2",
          title: "Hobit",
          authors: { name: "J.R.R. Tolkien" },
          cover: {
            medium: "https://via.placeholder.com/200x300/795548/white?text=HOBIT",
          },
        },
        readAt: new Date("2024-09-15"),
        rating: 5,
        notes: [
          {
            id: "note1",
            bookId: "book2",
            note: "Úžasná fantasy klasika! Tolkienův svět je neuvěřitelně detailní.",
            rating: 5,
            createdAt: new Date("2024-09-15"),
            updatedAt: new Date("2024-09-15"),
          },
        ],
        photos: [
          {
            id: "photo1",
            bookId: "book2",
            url: "https://via.placeholder.com/300x200/4CAF50/white?text=Reading+Spot",
            caption: "Čtení na balkoně za krásného počasí",
            createdAt: new Date("2024-09-10"),
          },
        ],
      },
    ],
    joinedAt: new Date("2023-01-15"),
  });

  const [activeTab, setActiveTab] = useState(0);
  const [openAddBook, setOpenAddBook] = useState(false);
  const [openAddNote, setOpenAddNote] = useState(false);
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [newNote, setNewNote] = useState("");
  const [newRating, setNewRating] = useState<number | null>(null);
  const [searchFilter, setSearchFilter] = useState("");

  const currentGoal = profile.readingGoals[0];
  const progressPercentage = currentGoal ? (currentGoal.currentBooks / currentGoal.targetBooks) * 100 : 0;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const addNoteToBook = (bookId: string) => {
    if (!newNote.trim()) return;

    const newNoteObj: BookNote = {
      id: Date.now().toString(),
      bookId,
      note: newNote,
      rating: newRating || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProfile((prev) => ({
      ...prev,
      readBooks: prev.readBooks.map((book) =>
        book.bookId === bookId ? { ...book, notes: [...book.notes, newNoteObj] } : book,
      ),
    }));

    setNewNote("");
    setNewRating(null);
    setOpenAddNote(false);
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
                  onClick={() => setOpenAddBook(true)}
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
                  <Card
                    key={item.id}
                    sx={{
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.bookDetail.cover?.medium || "https://via.placeholder.com/200x300"}
                      alt={item.bookDetail.title}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {item.bookDetail.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {item.bookDetail.authors?.name}
                      </Typography>

                      <Chip
                        label={item.priority}
                        size="small"
                        color={item.priority === "high" ? "error" : item.priority === "medium" ? "warning" : "default"}
                        sx={{ mb: 1 }}
                      />

                      {item.comment && (
                        <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                          &quot;{item.comment}&quot;
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
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
                  <Card
                    key={book.id}
                    sx={{
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 4,
                      },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={book.bookDetail.cover?.medium || "https://via.placeholder.com/200x300"}
                        alt={book.bookDetail.title}
                        sx={{ objectFit: "cover" }}
                      />
                      {book.rating && (
                        <Chip
                          label={`★ ${book.rating}/5`}
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "#4CAF50",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        />
                      )}
                    </Box>

                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {book.bookDetail.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {book.bookDetail.authors?.name}
                      </Typography>

                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Přečteno: {book.readAt.toLocaleDateString("cs-CZ")}
                      </Typography>

                      {/* Notes */}
                      {book.notes.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                            Poznámky ({book.notes.length})
                          </Typography>
                          {book.notes.slice(0, 1).map((note) => (
                            <Typography
                              key={note.id}
                              variant="body2"
                              sx={{
                                fontStyle: "italic",
                                backgroundColor: "#f5f5f5",
                                p: 1,
                                borderRadius: 1,
                                fontSize: "0.85rem",
                              }}
                            >
                              {note.note.length > 100 ? `${note.note.substring(0, 100)}...` : note.note}
                            </Typography>
                          ))}
                        </Box>
                      )}

                      {/* Photos */}
                      {book.photos.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                            Fotografie ({book.photos.length})
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            {book.photos.slice(0, 3).map((photo) => (
                              <Box
                                key={photo.id}
                                component="img"
                                src={photo.url}
                                alt={photo.caption}
                                sx={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: 1,
                                  objectFit: "cover",
                                  border: "2px solid #e0e0e0",
                                }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      )}

                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => {
                          setSelectedBook(book.bookId);
                          setOpenAddNote(true);
                        }}
                        sx={{ mt: 1 }}
                      >
                        Přidat poznámku
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
        </Fade>
      )}

      {/* Add Note Dialog */}
      <Dialog open={openAddNote} onClose={() => setOpenAddNote(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Přidat poznámku ke knize
          <IconButton onClick={() => setOpenAddNote(false)} sx={{ position: "absolute", right: 8, top: 8 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Poznámka"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            sx={{ mb: 3, mt: 1 }}
          />
          <Typography component="legend" gutterBottom>
            Hodnocení
          </Typography>
          <Rating value={newRating} onChange={(event, newValue) => setNewRating(newValue)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddNote(false)}>Zrušit</Button>
          <Button
            variant="contained"
            onClick={() => selectedBook && addNoteToBook(selectedBook)}
            disabled={!newNote.trim()}
          >
            Přidat poznámku
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Book Dialog Placeholder */}
      <Dialog open={openAddBook} onClose={() => setOpenAddBook(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Přidat knihu do seznamu</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Zde bude integrace s vyhledáváním knih pro přidání do &quot;Chci přečíst&quot; seznamu.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddBook(false)}>Zavřít</Button>
        </DialogActions>
      </Dialog>

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
