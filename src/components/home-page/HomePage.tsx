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
import { ProfilePage } from "@/components/home-page/components/ProfilePage";
import { Layout } from "../layout/Layout";

export const HomePage = () => {
  return (
    <Layout>
      <ProfilePage />
    </Layout>
  );
};
