import React, { FC } from "react";
import styles from "../page.module.css";
import Image from "next/image";
import formatedResourceUrl from "../../../utilities/getCdnUrl";
import Link from "next/link";

interface DisplayBookProps {
  bookId: string;
  bookAuthor: string;
  bookTitle: string;
  bookImageUrl: string;
}

const DisplayBook: FC<DisplayBookProps> = ({
  bookId,
  bookAuthor,
  bookTitle,
  bookImageUrl,
}) => {
  const pageForCurrentBook = "/book/" + bookId;

  return (
    <Link href={pageForCurrentBook} className={styles.DisplayBookLink}>
      <div className={styles.DisplayBookContainer}>
        <Image
          src={formatedResourceUrl(bookImageUrl)}
          alt={bookTitle + " picture"}
          width={200}
          height={200}
        />
        <div className={styles.DisplayBookContainerBookTitle}>{bookTitle}</div>
        <div>{bookAuthor}</div>
      </div>
    </Link>
  );
};

export default DisplayBook;
