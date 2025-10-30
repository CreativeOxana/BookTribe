"use client";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Divider,
  Tabs,
  Tab,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/search"
              sx={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Search
            </Typography>
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
          📚 BookNest
        </Typography>

        {children}
      </Container>
    </>
  );
};
