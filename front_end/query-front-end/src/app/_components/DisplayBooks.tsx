import React, { FC } from "react";
import { Books } from "../_utilities/fetchBooks";
import DisplayBook from "./DisplayBook";
import styles from "../page.module.css";

interface DisplayBooksProps {
  books: Books[];
}

const DisplayBooks: FC<DisplayBooksProps> = ({ books }) => {
  return (
    <div className={styles.DisplayBooksContainer}>
      {books.map((book) => (
        <DisplayBook
          key={book.bookId}
          bookId={book.bookId}
          bookAuthor={book.bookAuthor}
          bookTitle={book.bookTitle}
          bookImageUrl={book.bookImageUrl}
        />
      ))}
    </div>
  );
};

export default DisplayBooks;
