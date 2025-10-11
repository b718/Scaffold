"use client";

import { useEffect, useState } from "react";
import fetchBooks, { Books } from "./_utilities/fetchBooks";
import DisplayBooks from "./_components/DisplayBooks";
import styles from "./page.module.css";
import SearchBar from "./_components/SearchBar";

export const runtime = "edge";

export default function Home() {
  const [books, setBooks] = useState<Books[]>([]);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchBooks()
      .then((books) => {
        setBooks(books);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return (
      <div className={styles.DisplayBookContainer}>
        {"something went wrong :(, please refresh"}
      </div>
    );
  }

  return (
    <div className={styles.PageContainer}>
      <SearchBar />
      <DisplayBooks books={books} />
    </div>
  );
}
