"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import fetchExportType from "./_utilities/fetchExportType";
import styles from "../../page.module.css";

const page = () => {
  const pathName = usePathname().split("/");
  const exportType = pathName[pathName.length - 1];
  const bookId = pathName[pathName.length - 3];
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchExportType(bookId, exportType)
      .then((downloadUrl) => setDownloadUrl(downloadUrl.presignedUrl))
      .catch((error) => setError(error));
  }, []);

  return (
    <div className={styles.ExportContainer}>
      <div className={styles.ExportCard}>
        <h2>{`Export to ${exportType}`}</h2>

        {error ? (
          <div>{"an error happened :(, please refresh"}</div>
        ) : (
          <a href={downloadUrl}>{downloadUrl ? "Download" : "Loading..."}</a>
        )}
      </div>
    </div>
  );
};

export default page;
