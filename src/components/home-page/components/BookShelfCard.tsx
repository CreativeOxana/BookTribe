"use client";

import {
  BookmarkAdd,
  Cancel,
  CheckCircle,
  Delete,
  Flag,
  LowPriority,
  MenuBook,
  Note,
  PhotoCamera,
  PriorityHigh,
  Save,
  Star,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Fade,
  IconButton,
  Rating,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ReadBook, WantToReadBook } from "@/types/typesProfile";

// Typy pro různé stavy knihy
export type BookStatus = "want-to-read" | "reading" | "read";

export type BookShelfCardProps = {
  // Univerzální kniha - může být WantToReadBook nebo ReadBook
  book: WantToReadBook | ReadBook;
  status: BookStatus;
  onDelete?: () => void;
  onAddNote?: () => void;
  onAddPhoto?: () => void;
  onMarkAsRead?: () => void;
  onRatingChange?: (rating: number) => void;
  showActions?: boolean;
};

export const BookShelfCard = ({
  book,
  status,
  onDelete,
  onAddNote,
  onAddPhoto,
  onMarkAsRead,
  onRatingChange,
  showActions = true,
}: BookShelfCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [expandedFor, setExpandedFor] = useState<"note" | "photo" | null>(null);

  // Pomocné funkce pro určení vlastností podle stavu
  const getStatusConfig = (status: BookStatus) => {
    switch (status) {
      case "want-to-read":
        return {
          icon: <BookmarkAdd />,
          label: "Chci přečíst",
          color: "#4CAF50", // Zelená
          bgColor: "#E8F5E8",
        };
      case "reading":
        return {
          icon: <MenuBook />,
          label: "Právě čtu",
          color: "#FF9800", // Oranžová
          bgColor: "#FFF3E0",
        };
      case "read":
        return {
          icon: <CheckCircle />,
          label: "Přečteno",
          color: "#4CAF50", // Zelená
          bgColor: "#E8F5E8",
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  // Funkce pro získání ikony a barvy podle priority
  const getPriorityConfig = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
      case "vysoká":
      case "vysoka":
        return {
          icon: <PriorityHigh fontSize="small" />,
          color: "#f44336", // Červená
          tooltip: "Vysoká priorita",
        };
      case "medium":
      case "střední":
      case "stredni":
        return {
          icon: <Flag fontSize="small" />,
          color: "#ff9800", // Oranžová
          tooltip: "Střední priorita",
        };
      case "low":
      case "nízká":
      case "nizka":
        return {
          icon: <LowPriority fontSize="small" />,
          color: "#9e9e9e", // Šedá
          tooltip: "Nízká priorita",
        };
      default:
        return {
          icon: <Flag fontSize="small" />,
          color: "#9e9e9e",
          tooltip: "Priorita",
        };
    }
  };

  // Zjisti jestli má kniha rating (jen pro přečtené knihy)
  const hasRating = "rating" in book && book.rating;
  const hasNotes = "notes" in book && book.notes && book.notes.length > 0;
  const hasPhotos = "photos" in book && book.photos && book.photos.length > 0;
  const hasPriority = "priority" in book && book.priority;

  // Handler funkce pro poznámky a fotografie
  const handleNoteClick = () => {
    setExpandedFor("note");
    setIsExpanded(true);
  };

  const handlePhotoClick = () => {
    setExpandedFor("photo");
    setIsExpanded(true);
  };

  const handleSaveNote = () => {
    if (onAddNote && newNote.trim()) {
      onAddNote();
      console.log("Saving note:", newNote);
      setNewNote("");
    }
    setExpandedFor(null);
    setIsExpanded(false);
  };

  const handleSavePhoto = () => {
    if (onAddPhoto && selectedPhotos.length > 0) {
      onAddPhoto();
      console.log("Saving photos:", selectedPhotos);
      setSelectedPhotos([]);
    }
    setExpandedFor(null);
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setNewNote("");
    setSelectedPhotos([]);
    setExpandedFor(null);
    setIsExpanded(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedPhotos(Array.from(files));
    }
  };

  return (
    <Fade in={true} timeout={300}>
      <Card
        sx={{
          minHeight: 420,
          width: "100%",
          maxWidth: 280,
          display: "flex",
          flexDirection: "column",
          cursor: isExpanded ? "default" : "pointer",
          transition: "all 0.3s ease-in-out",
          transform: isHovered && !isExpanded ? "translateY(-8px)" : "translateY(0)",
          boxShadow: isHovered || isExpanded ? 8 : 2,
          border: `2px solid ${isHovered || isExpanded ? statusConfig.color : "transparent"}`,
          "&:hover": {
            "& .action-buttons": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Obrázek knihy */}
        <Box
          sx={{
            height: 220,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 1,
            backgroundColor: statusConfig.bgColor,
            borderBottom: `2px solid ${statusConfig.color}`,
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "auto",
              height: "100%",
              maxWidth: "75%",
              objectFit: "contain",
              borderRadius: 1,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "transform 0.2s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              zIndex: 1,
            }}
            image={
              book.bookDetail.cover?.medium ||
              book.bookDetail.cover?.large ||
              book.bookDetail.cover?.small ||
              "https://covers.openlibrary.org/b/isbn/9780062315007-M.jpg"
            }
            alt={book.bookDetail.title}
            onError={(e) => {
              console.error(`❌ Obálka knihy "${book.bookDetail.title}" se nepodařila načíst:`, e.currentTarget.src);
              console.log("📚 Data obálky knihy:", book.bookDetail.cover);
              // Fallback to Google Books API backup
              if (!e.currentTarget.src.includes("books.google.com")) {
                e.currentTarget.src =
                  "https://books.google.com/books/content?id=FzVjBgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api";
                console.log("🔄 Přepínám na fallback obálku z Google Books");
              }
            }}
          />

          {/* Status chip v rohu */}
          <Chip
            icon={statusConfig.icon}
            label={statusConfig.label}
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: statusConfig.color,
              color: "white",
              fontWeight: "bold",
              fontSize: "0.75rem",
              zIndex: 2,
              "& .MuiChip-icon": {
                color: "white",
              },
            }}
            size="small"
          />

          {/* Priority pro "Chci přečíst" */}
          {hasPriority &&
            (() => {
              const priorityConfig = getPriorityConfig(book.priority);
              return (
                <Tooltip title={priorityConfig.tooltip}>
                  <Chip
                    icon={priorityConfig.icon}
                    label=""
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 25,
                      backgroundColor: priorityConfig.color,
                      color: "white",
                      fontSize: "0.7rem",
                      zIndex: 2,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      border: "2px solid rgba(255,255,255,0.2)",
                      minWidth: "32px",
                      "& .MuiChip-icon": {
                        color: "white",
                        margin: 0,
                      },
                      "& .MuiChip-label": {
                        display: "none",
                      },
                    }}
                  />
                </Tooltip>
              );
            })()}

          {/* Rating pro přečtené knihy */}
          {hasRating && (
            <Chip
              icon={<Star sx={{ color: "#FFD700", fontSize: "16px" }} />}
              label={`${book.rating}/5`}
              sx={{
                position: "absolute",
                top: 8,
                right: 25,
                backgroundColor: "#4CAF50",
                color: "white",
                fontWeight: "bold",
                fontSize: "0.75rem",
                zIndex: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                border: "2px solid rgba(255,255,255,0.2)",
                "& .MuiChip-icon": {
                  color: "#FFD700 !important",
                },
              }}
              size="small"
            />
          )}
        </Box>

        {/* Obsah karty */}
        <CardContent
          sx={{
            flexGrow: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Box>
            {/* Název knihy */}
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
                fontSize: "0.95rem",
                mb: 1,
              }}
            >
              {book.bookDetail.title}
            </Typography>

            {/* Autor */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                mb: 1,
                fontSize: "0.85rem",
              }}
            >
              {book.bookDetail.authors?.name || "Neznámý autor"}
            </Typography>

            {/* Komentář pro "Chci přečíst" */}
            {"comment" in book && book.comment && (
              <Typography
                variant="body2"
                sx={{
                  fontStyle: "italic",
                  color: "text.secondary",
                  fontSize: "0.8rem",
                  mb: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                &quot;{book.comment}&quot;
              </Typography>
            )}

            {/* Datum pro přečtené knihy */}
            {"readAt" in book && (
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem", mb: 1 }}>
                Přečteno: {book.readAt.toLocaleDateString("cs-CZ")}
              </Typography>
            )}

            {/* Indikátory poznámek a fotek */}
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              {hasNotes && (
                <Tooltip title={`${book.notes.length} poznámek`}>
                  <Chip
                    icon={<Note />}
                    label={book.notes.length}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: "0.7rem" }}
                  />
                </Tooltip>
              )}
              {hasPhotos && (
                <Tooltip title={`${book.photos.length} fotografií`}>
                  <Chip
                    icon={<PhotoCamera />}
                    label={book.photos.length}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: "0.7rem" }}
                  />
                </Tooltip>
              )}
            </Stack>
          </Box>

          {/* Akční tlačítka - zobrazí se při hover */}
          {showActions && (
            <Box
              className="action-buttons"
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                opacity: 0,
                transform: "translateY(10px)",
                transition: "all 0.2s ease",
                display: "flex",
                gap: 0.5,
              }}
            >
              {onAddPhoto && (
                <Tooltip title={isExpanded && expandedFor === "photo" ? "Zavřít fotografie" : "Přidat fotografii"}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isExpanded && expandedFor === "photo") {
                        setIsExpanded(false);
                        setExpandedFor(null);
                      } else {
                        handlePhotoClick();
                      }
                    }}
                    sx={{
                      color: isExpanded && expandedFor === "photo" ? "#f44336" : "inherit",
                      backgroundColor: isExpanded && expandedFor === "photo" ? "rgba(244, 67, 54, 0.1)" : "transparent",
                    }}
                  >
                    <PhotoCamera fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}

              {onAddNote && (
                <Tooltip title={isExpanded && expandedFor === "note" ? "Zavřít poznámky" : "Přidat poznámku"}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isExpanded && expandedFor === "note") {
                        setIsExpanded(false);
                        setExpandedFor(null);
                      } else {
                        handleNoteClick();
                      }
                    }}
                    sx={{
                      color: isExpanded && expandedFor === "note" ? "#f44336" : "inherit",
                      backgroundColor: isExpanded && expandedFor === "note" ? "rgba(244, 67, 54, 0.1)" : "transparent",
                    }}
                  >
                    <Note fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}

              {onMarkAsRead && status === "want-to-read" && (
                <Tooltip title="Označit jako přečtené">
                  <IconButton
                    size="small"
                    sx={{ color: "#4CAF50" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkAsRead();
                    }}
                  >
                    <CheckCircle fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}

              {onDelete && (
                <Tooltip title="Odstranit">
                  <IconButton
                    size="small"
                    sx={{ color: "#f44336" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          )}
        </CardContent>

        {/* Rating pro přečtené knihy - interaktivní */}
        {status === "read" && onRatingChange && !isExpanded && (
          <Box sx={{ px: 2, pb: 1 }}>
            <Rating
              value={hasRating ? book.rating : 0}
              onChange={(_, value) => onRatingChange(value || 0)}
              size="small"
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#FFD700",
                },
                "& .MuiRating-iconHover": {
                  color: "#FFA000",
                },
              }}
            />
          </Box>
        )}

        {/* Rozbalovací sekce pro editaci */}
        <Collapse in={isExpanded} timeout={300}>
          <Box sx={{ p: 2, borderTop: `2px solid ${statusConfig.color}`, backgroundColor: statusConfig.bgColor }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {expandedFor === "note" ? "📝 Přidat poznámku" : "📷 Přidat fotografii"}
            </Typography>

            <Stack spacing={2}>
              {/* Poznámka sekce */}
              {expandedFor === "note" && (
                <TextField
                  fullWidth
                  label="Poznámka"
                  multiline
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  size="small"
                  placeholder={
                    status === "want-to-read"
                      ? "Poznámky a očekávání..."
                      : status === "read"
                        ? "Vaše poznámky a dojmy z knihy..."
                        : "Vaše poznámky..."
                  }
                />
              )}

              {/* Fotografie sekce */}
              {expandedFor === "photo" && (
                <>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<PhotoCamera />}
                    sx={{
                      borderColor: statusConfig.color,
                      color: statusConfig.color,
                      "&:hover": {
                        borderColor: statusConfig.color,
                        backgroundColor: statusConfig.bgColor,
                      },
                    }}
                  >
                    Vybrat fotografie
                    <input type="file" hidden multiple accept="image/*" onChange={handleFileChange} />
                  </Button>

                  {selectedPhotos.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Vybrané fotografie ({selectedPhotos.length})
                      </Typography>

                      {/* Preview malých obrázků */}
                      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
                        {selectedPhotos.map((file, index) => (
                          <Box key={index} sx={{ position: "relative" }}>
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              style={{
                                width: 60,
                                height: 60,
                                objectFit: "cover",
                                borderRadius: 4,
                                border: `2px solid ${statusConfig.color}`,
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => {
                                setSelectedPhotos((prev) => prev.filter((_, i) => i !== index));
                              }}
                              sx={{
                                position: "absolute",
                                top: -8,
                                right: -8,
                                backgroundColor: "#f44336",
                                color: "white",
                                width: 20,
                                height: 20,
                                "&:hover": { backgroundColor: "#d32f2f" },
                              }}
                            >
                              ×
                            </IconButton>
                          </Box>
                        ))}
                      </Stack>

                      {/* Seznam názvů souborů */}
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {selectedPhotos.map((file, index) => (
                          <Chip
                            key={index}
                            label={file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
                            size="small"
                            sx={{ mb: 1, fontSize: "0.7rem" }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </>
              )}

              {/* Akční tlačítka */}
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button variant="outlined" size="small" onClick={handleCancel} startIcon={<Cancel />}>
                  Zrušit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={expandedFor === "note" ? handleSaveNote : handleSavePhoto}
                  startIcon={<Save />}
                  disabled={
                    expandedFor === "note"
                      ? !newNote.trim()
                      : expandedFor === "photo"
                        ? selectedPhotos.length === 0
                        : true
                  }
                  sx={{
                    backgroundColor: statusConfig.color,
                    "&:hover": {
                      backgroundColor: statusConfig.color,
                      opacity: 0.9,
                    },
                  }}
                >
                  {expandedFor === "note" ? "Uložit poznámku" : "Uložit fotografie"}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Collapse>
      </Card>
    </Fade>
  );
};
