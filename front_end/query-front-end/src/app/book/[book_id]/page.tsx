"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import fetchBook, { Book } from "./_utilites/fetchBook";
import Image from "next/image";
import styles from "./page.module.css";
import formatBookChapters from "./_utilites/formatBookChapters";
import DisplayExportSection from "./_components/DisplayExportSection";

const page = () => {
  const pathName = usePathname().split("/");
  const bookId = pathName[pathName.length - 1];
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<Error>();
  let bookPublishDate: Date | null = null;

  useEffect(() => {
    fetchBook(bookId)
      .then((book) => {
        setBook(book);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return (
      <div className={styles.PageSection}>
        error lol, please refresh the page
      </div>
    );
  }

  if (!book) {
    return (
      <div className={styles.PageSection}>Please refresh the page, thanks!</div>
    );
  }
  bookPublishDate = new Date(book.bookPublishDate);
  formatBookChapters(book.bookChapters);
  return (
    <div className={styles.PageSection}>
      <Image
        src={book.bookImageUrl}
        alt={book.bookTitle + "picture"}
        width={200}
        height={200}
      />
      <div>{book.bookTitle}</div>
      <div>{book.bookAuthor}</div>
      <div>{bookPublishDate.toDateString()}</div>
      <DisplayExportSection />
    </div>
  );
};

export default page;
