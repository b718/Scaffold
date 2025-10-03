import React, { FC } from "react";
import styles from "../page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import formatedResourceUrl from "../../../utilities/getCdnUrl";

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
  const router = useRouter();
  const redirectToBookPage = () => {
    const pageForCurrentBook = "/book/" + bookId;
    router.push(pageForCurrentBook);
  };

  return (
    <div className={styles.DisplayBookContainer} onClick={redirectToBookPage}>
      <Image
        src={formatedResourceUrl(bookImageUrl)}
        alt={bookTitle + " picture"}
        width={200}
        height={200}
      />
      <div className={styles.DisplayBookContainerBookTitle}>{bookTitle}</div>
      <div>{bookAuthor}</div>
    </div>
  );
};

export default DisplayBook;
