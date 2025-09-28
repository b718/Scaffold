import React from "react";
import styles from "../page.module.css";
import Image from "next/image";
import notionImage from "../../../../../public/notion.png";
import logseqImage from "../../../../../public/logseq.png";
import obsidianImage from "../../../../../public/obsidian.png";
import ankiImage from "../../../../../public/anki.png";

const DisplayExportSection = () => {
  const exportImages = [notionImage, logseqImage, obsidianImage, ankiImage];

  return (
    <div className={styles.DisplayExportContainer}>
      <text>Different Export Options</text>
      <div className={styles.ExportOptionsContainer}>
        {exportImages.map((imageSrc, index) => (
          <Image
            key={index}
            src={imageSrc}
            alt={"notion export image"}
            width={50}
            height={50}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayExportSection;
