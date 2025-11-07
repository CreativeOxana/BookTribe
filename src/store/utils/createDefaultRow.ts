import { UserBookRow } from "@/types/typesDetail";

export const createDefaultRow = (id: string): UserBookRow => ({
  id,
  isRead: false,
});
