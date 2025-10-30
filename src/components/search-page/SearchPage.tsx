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
} from "@mui/material";
import { BookSearchCard } from "@/components/search-page/components/BookSearchCard";
import { Layout } from "../layout/Layout";

export const SearchPage = () => {
  return (
    <Layout>
      <BookSearchCard />
    </Layout>
  );
};
