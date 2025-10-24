import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Divider,
  Checkbox,
  FormControlLabel,
  TextField,
  Collapse,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BookDetail } from "@/types/types";
import { useState } from "react";

interface ModalDetailProps {
  dialogOpen: boolean;
  handleCloseDialog: () => void;
  selectedBook: BookDetail | null;
}

export const ModalDetail = ({
  dialogOpen,
  handleCloseDialog,
  selectedBook,
}: ModalDetailProps) => {
  const [isRead, setIsRead] = useState(false);
  const [review, setReview] = useState("");
  const [isReviewSaved, setIsReviewSaved] = useState(false);

  const handleReadToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsRead(event.target.checked);
    // Pokud se odoznačí, vymaž recenzi
    if (!event.target.checked) {
      setReview("");
      setIsReviewSaved(false);
    }
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
    setIsReviewSaved(false);
  };

  const handleSaveReview = () => {
    if (review.trim()) {
      setIsReviewSaved(true);
      // Zde by se mohla recenze uložit do localStorage nebo databáze
      console.log(`Recenze uložena pro knihu ${selectedBook?.title}:`, review);
    }
  };

  return (
    <>
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

          {/* Checkbox pro označení přečtené knihy */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isRead}
                  onChange={handleReadToggle}
                  color="success"
                />
              }
              label={
                <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                  {isRead ? " Knihu jsem přečetl/a" : " Označit jako přečtenou"}
                </Typography>
              }
            />
          </Box>

          {/* Rozbalovací pole pro recenzi */}
          <Collapse in={isRead} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 2, px: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  textAlign: "center",
                  color: "darkpurple",
                }}
              >
                ✍️ Napište svou recenzi nebo poznámku
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={4}
                value={review}
                onChange={handleReviewChange}
                placeholder="Jak se vám kniha líbila? Co vás zaujalo? Vaše hodnocení..."
                variant="outlined"
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "darkgreen",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "darkgreen",
                      borderWidth: "2px",
                    },
                  },
                }}
                helperText={`${review.length}/500 znaků`}
                slotProps={{
                  htmlInput: {
                    maxLength: 500,
                  },
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSaveReview}
                  disabled={!review.trim() || isReviewSaved}
                  sx={{ minWidth: 120 }}
                >
                  {isReviewSaved ? "✅ Uloženo" : "💾 Uložit recenzi"}
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => setReview("")}
                  disabled={!review.trim()}
                  sx={{ minWidth: 120 }}
                >
                  🗑️ Vymazat
                </Button>
              </Box>

              {isReviewSaved && (
                <Typography
                  variant="body2"
                  color="success.main"
                  sx={{ textAlign: "center", mt: 1 }}
                >
                  ✨ Vaše recenze byla úspěšně uložena!
                </Typography>
              )}
            </Box>
          </Collapse>
        </DialogContent>
      </Dialog>
    </>
  );
};
