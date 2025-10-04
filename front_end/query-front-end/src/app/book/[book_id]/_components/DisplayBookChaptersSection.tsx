import React, { FC, useEffect, useState } from "react";
import formatBookChapters from "../_utilites/formatBookChapters";
import styles from "../page.module.css";

interface DisplayBookChaptersSectionProps {
  bookChapters: string[];
}

const DisplayBookChaptersSection: FC<DisplayBookChaptersSectionProps> = ({
  bookChapters,
}) => {
  const [formattedChapters, setFormattedChapters] = useState<string[]>([]);

  useEffect(() => {
    setFormattedChapters(formatBookChapters(bookChapters));
  }, [bookChapters]);

  return (
    <div className={styles.DisplayBookChaptersContainer}>
      <p>Chapters in the book: </p>
      {formattedChapters.map((bookChapter, index) => (
        <div key={index}>{bookChapter}</div>
      ))}
    </div>
  );
};

export default DisplayBookChaptersSection;
