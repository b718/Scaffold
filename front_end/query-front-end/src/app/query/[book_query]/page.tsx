"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import fetchBookQuery, { Book } from "./_utilities/fetchBookQuery";
import DisplayBooks from "@/app/_components/DisplayBooks";
import SearchBar from "@/app/_components/SearchBar";
import styles from "./page.module.css";

const page = () => {
  const pathName = usePathname().split("/");
  const bookQuery = pathName[pathName.length - 1];
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchBookQuery(bookQuery)
      .then((books) => {
        setBooks(books);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return <div>something went wrong lol, please try again thanks!</div>;
  }

  return (
    <div className={styles.PageContainer}>
      <SearchBar />
      <DisplayBooks books={books} />
    </div>
  );
};

export default page;
