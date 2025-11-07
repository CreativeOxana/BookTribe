import { ReactNode } from "react";
import { Book, UserBookRow } from "@/types/typesDetail";

export type ApiStoreValue = {
  books: Book[];
  loading: boolean;
  createRow: (id: string) => void;
  updateRow: (id: string, value: Partial<UserBookRow>) => void;
};

export type ApiStoreProviderProps = {
  children: ReactNode;
};
