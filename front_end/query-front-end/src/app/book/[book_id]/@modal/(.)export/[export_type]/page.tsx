"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "../../../page.module.css";
import fetchExportType from "../../../export/[export_type]/_utilities/fetchExportType";
import getExportTypeVideo from "../../../export/[export_type]/_utilities/getExportTypeVideo";

export const runtime = "edge";

const ExportModal = () => {
  const router = useRouter();
  const pathName = usePathname().split("/");
  const exportType = pathName[pathName.length - 1];
  const bookId = pathName[pathName.length - 3];
  const [downloadUrl, setDownloadUrl] = useState<string>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchExportType(bookId, exportType)
      .then((downloadUrl) => setDownloadUrl(downloadUrl.presignedUrl))
      .catch((error) => setError(error));
  }, [bookId, exportType]);

  return (
    <div className={styles.ExportModalContainer}>
      <div className={styles.ExportModalCard}>
        <h2>{`Export to ${exportType}`}</h2>

        <iframe src={getExportTypeVideo(exportType)} allowFullScreen />

        {error ? (
          <div>{"an error happened :(, please refresh"}</div>
        ) : (
          <a href={downloadUrl}>{downloadUrl ? "Download" : "Loading..."}</a>
        )}

        <button
          type="button"
          className={styles.ModalCloseButton}
          onClick={() => router.back()}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ExportModal;
