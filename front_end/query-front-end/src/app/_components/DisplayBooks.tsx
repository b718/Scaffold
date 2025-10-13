import React, { FC, useMemo } from "react";
import { Books } from "../_utilities/fetchBooks";
import DisplayBook from "./DisplayBook";
import styles from "../page.module.css";
import getUserIntakeForm from "../../../utilities/getUserIntakeForm";

interface DisplayBooksProps {
  books: Books[];
}

const DisplayBooks: FC<DisplayBooksProps> = ({ books }) => {
  const userIntakeFormUrl = getUserIntakeForm();

  if (books.length == 0) {
    return (
      <div className={styles.DisplayBooksErrorContainer}>
        {"sadly we don't have this book yet :("}
        <div>
          please submit a request{" "}
          <a href={userIntakeFormUrl} target={"_blank"}>
            here
          </a>
        </div>
      </div>
    );
  }

  const displayBooks = useMemo(() => {
    return books.map((book) => (
      <DisplayBook
        key={book.bookId}
        bookId={book.bookId}
        bookAuthor={book.bookAuthor}
        bookTitle={book.bookTitle}
        bookImageUrl={book.bookImageUrl}
      />
    ));
  }, [books]);

  return <div className={styles.DisplayBooksContainer}>{displayBooks}</div>;
};

export default DisplayBooks;
