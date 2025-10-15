"use client";
import { Bookmark } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const load = async () => {
      const result = await fetch(
        //"https://openlibrary.org/search.json?q=harry+potter&limit=5"
        "https://openlibrary.org/api/books?bibkeys=ISBN:9780140328721&format=json&jscmd=data"
      );
      console.log("🚀 ~ Home ~ result:", await result.json());
    };

    load();
  }, []);

  return (
    <Container maxWidth="sm">
      <Stack gap={2} direction={"row"}>
        <Button variant="contained">Contained</Button>
        <Button sx={{ my: 4 }} variant="contained">
          Contained
        </Button>
        <Button variant="contained">Contained</Button>
      </Stack>
      <Bookmark />
      <Typography variant="h3"> Heading</Typography>
      <Typography> Heading</Typography>
    </Container>
  );
}
