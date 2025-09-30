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
      <text>Chapters in the book: </text>
      {formattedChapters.map((bookChapter) => (
        <div>{bookChapter}</div>
      ))}
    </div>
  );
};

export default DisplayBookChaptersSection;
