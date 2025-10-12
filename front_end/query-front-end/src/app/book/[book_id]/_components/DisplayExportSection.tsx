import React, { FC } from "react";
import styles from "../page.module.css";
import Image from "next/image";
import notionImage from "../../../../../public/notion.png";
import obsidianImage from "../../../../../public/obsidian.png";
import ankiImage from "../../../../../public/anki.png";
import { useRouter } from "next/navigation";
import { exportType } from "../export/[export_type]/_utilities/getExportTypeVideo";

interface DisplayExportSectionProps {
  bookId: string;
}

const DisplayExportSection: FC<DisplayExportSectionProps> = ({ bookId }) => {
  const exportImages = [notionImage, obsidianImage, ankiImage];
  const router = useRouter();
  const redirectToExportPage = (exportTypeIndex: number) => {
    const pageForExportType =
      "/book/" + bookId + "/export/" + exportType[exportTypeIndex];
    router.push(pageForExportType);
  };

  return (
    <div className={styles.DisplayExportContainer}>
      <p>Different Export Options</p>
      <div className={styles.ExportOptionsContainer}>
        {exportImages.map((imageSrc, index) => (
          <Image
            key={index}
            src={imageSrc}
            alt={`${exportType[index]} export image`}
            width={50}
            height={50}
            onClick={() => redirectToExportPage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayExportSection;
