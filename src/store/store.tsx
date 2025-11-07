"use client";

import { createContext, useContext, useMemo } from "react";
import { useBookDetails } from "@/store/hooks/useBookDetails";
import { getBooks } from "@/utils/getBooks";
import { useUserBookRows } from "./hooks/useUserBookRows";
import { ApiStoreProviderProps, ApiStoreValue } from "./types";

const ApiStoreContext = createContext<ApiStoreValue | undefined>(undefined);

export const ApiStoreProvider = ({ children }: ApiStoreProviderProps) => {
  const { userBookRows, createRow, updateRow } = useUserBookRows();

  const booklist = useMemo(() => Object.keys(userBookRows), [userBookRows]);
  const { bookDetails, loading } = useBookDetails(booklist);
  const books = getBooks(userBookRows, bookDetails);

  const value = useMemo(() => ({ books, loading, createRow, updateRow }), [books, createRow, loading, updateRow]);

  return <ApiStoreContext value={value}>{children}</ApiStoreContext>;
};

export const useApiStore = () => {
  const context = useContext(ApiStoreContext);

  if (context === undefined) {
    throw new Error("useApiStore must be used within a ApiStoreProvider");
  }

  return context;
};
