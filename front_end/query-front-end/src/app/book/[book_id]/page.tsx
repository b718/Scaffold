"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import fetchBook, { Book } from "./_utilites/fetchBook";
import Image from "next/image";
import styles from "./page.module.css";
import DisplayExportSection from "./_components/DisplayExportSection";
import DisplayBookChaptersSection from "./_components/DisplayBookChaptersSection";
import DisplayBookDetails from "./_components/DisplayBookDetails";
import formatedResourceUrl from "../../../../utilities/getCdnUrl";

const Page = () => {
  const pathName = usePathname().split("/");
  const bookId = pathName[pathName.length - 1];
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<Error>();
  useEffect(() => {
    fetchBook(bookId)
      .then((book) => setBook(book))
      .catch((error) => setError(error));
  }, []);

  if (error || !book) {
    return (
      <div className={styles.PageSection}>
        {"error :( please refresh the page"}
      </div>
    );
  }

  return (
    <div className={styles.PageSection}>
      <Image
        src={formatedResourceUrl(book.bookImageUrl)}
        alt={book.bookTitle + " picture"}
        width={200}
        height={200}
      />
      <DisplayBookDetails
        bookTitle={book.bookTitle}
        bookAuthor={book.bookAuthor}
        bookPublishDate={book.bookPublishDate}
      />
      <DisplayBookChaptersSection bookChapters={book.bookChapters} />
      <DisplayExportSection bookId={book.bookId} />
    </div>
  );
};

export default Page;
