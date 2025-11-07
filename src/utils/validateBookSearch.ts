import { BookSearch, BookSearchResponse } from "@/types/typesSearch";

// Jednoduchá validace výsledků vyhledávání — odstraní položky bez title nebo key
export const validateBookSearch = (data: BookSearchResponse): BookSearch[] => {
  if (!data || !Array.isArray(data.docs)) return [];

  const valid: BookSearch[] = data.docs
    .map((doc) => ({
      ...doc,
      id: doc.isbn ? doc.isbn[0] : "", // Přidáme pole id odvozené z isbn
    }))
    .filter((doc) => {
      if (!doc) return false;
      if (typeof doc.title !== "string" || doc.title.trim() === "") return false;
      if (typeof doc.key !== "string" || doc.key.trim() === "") return false;
      return true;
    });

  return valid;
};
