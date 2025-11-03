"use client";

import { AppBar, Container, Stack, Toolbar, Typography } from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import Link from "next/link";

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AppBar position="static" sx={{ background: "linear-gradient(135deg, #023d0fff 0%, #107c22ff 100%)" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              sx={{
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
                mr: 4,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <span role="img" aria-label="kniha">
                📚
              </span>{" "}
              BookNest
            </Typography>
            <Stack direction="row" spacing={2} sx={{ ml: "auto" }}>
              <MuiLink component={Link} href="/profile" color="inherit" underline="none" fontWeight="bold">
                Profil
              </MuiLink>
              <MuiLink component={Link} href="/search" color="inherit" underline="none" fontWeight="bold">
                Vyhledat knihy
              </MuiLink>
              <MuiLink component={Link} href="/recommend" color="inherit" underline="none" fontWeight="bold">
                Doporučené knihy
              </MuiLink>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          textAlign="center"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "green",
          }}
        >
          Vítej v BookNest!
        </Typography>

        {children}
      </Container>
    </>
  );
};
