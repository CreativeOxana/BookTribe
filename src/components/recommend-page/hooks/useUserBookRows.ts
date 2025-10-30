import { BookDetail, UserBookRow } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchDetail } from "@/fetch/fetchDetail";
import { validateBookDetail } from "@/utils/validateBookDetail";
import { useLocalStorage } from "usehooks-ts";

const defaultUserBookRows: Record<string, UserBookRow> = {
  "9780439708180": {
    id: "9780439708180",
    isRead: false,
  },
  "9780316769174": {
    id: "9780316769174",
    isRead: false,
  },
  // "9780061122415": {
  //   id: "9780061122415",
  //   isRead: false,
  // },
  // "9780743273565": {
  //   id: "9780743273565",
  //   isRead: false,
  // },
  // "9780544003415": {
  //   id: "9780544003415",
  //   isRead: false,
  // },
};

const createDefaultRow = (id: string): UserBookRow => ({
  id,
  isRead: false,
});

export const useUserBookRows = () => {
  const [userBookRows, setUserBookRows] = useLocalStorage<
    Record<string, UserBookRow>
  >("userBookRows", defaultUserBookRows);

  const createRow = (id: string) =>
    setUserBookRows((prev) => ({ ...prev, [id]: createDefaultRow(id) }));

  const updateRow = (id: string, value: Partial<UserBookRow>) =>
    setUserBookRows((prev) => ({ ...prev, [id]: { ...prev[id], ...value } }));

  return { userBookRows, createRow, updateRow };
};
