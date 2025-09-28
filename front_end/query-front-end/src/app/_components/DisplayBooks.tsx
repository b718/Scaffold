import React, { FC } from "react";
import { Books } from "../_utilities/fetchBooks";
import DisplayBook from "./DisplayBook";
import styles from "../page.module.css";

interface DisplayBooksProps {
  books: Books[];
}

const DisplayBooks: FC<DisplayBooksProps> = ({ books }) => {
  if (books.length == 0) {
    return (
      <div className={styles.DisplayBooksContainer}>
        {"sadly we don't have this book yet :("}
      </div>
    );
  }

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
