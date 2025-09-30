import { StatusCodes } from "http-status-codes";
import getPresignedurl from "../../../../../../../utilities/getPresignedUrl";

type FetchExportTypeResponse = {
  presignedUrl: string;
};

type FetchExportTypeRequest = {
  bookId: string;
  exportType: string;
};

export default async function fetchExportType(
  bookId: string,
  exportType: string
): Promise<FetchExportTypeResponse> {
  const presignedUrl = getPresignedurl();
  const requestBody: FetchExportTypeRequest = {
    bookId,
    exportType,
  };
  const exportFile = await fetch(presignedUrl!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  const response: FetchExportTypeResponse = await exportFile.json();
  if (exportFile.status != StatusCodes.OK) {
    throw Error("unable to get book, please try again");
  }

  return response;
}
