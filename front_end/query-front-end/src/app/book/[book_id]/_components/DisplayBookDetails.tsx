import React, { FC } from "react";
import styles from "../page.module.css";

interface DisplayBookDetailsProps {
  bookTitle: string;
  bookAuthor: string;
  bookPublishDate: string;
}
const DisplayBookDetails: FC<DisplayBookDetailsProps> = ({
  bookTitle,
  bookAuthor,
  bookPublishDate,
}) => {
  const pubishDate = new Date(bookPublishDate);

  return (
    <div className={styles.DisplayBookDetailsContainer}>
      <div>{bookTitle}</div>
      <div>{bookAuthor}</div>
      <div>{pubishDate.toDateString()}</div>
    </div>
  );
};

export default DisplayBookDetails;
