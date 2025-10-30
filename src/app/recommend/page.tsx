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

import { RecommendPage } from "@/components/recommend-page/RecommendPage";

export default async function Recommend() {
  return <RecommendPage />;
}
