"use server";
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

import { SearchPage } from "@/components/search-page/SearchPage";

export default async function Search() {
  return <SearchPage />;
}
