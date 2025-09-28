import { StatusCodes } from "http-status-codes";
import getServerUrl from "../../../../../utilities/getServerUrl";

export type Book = {
  bookId: string;
  bookAuthor: string;
  bookChapters: string[];
  bookTitle: string;
  bookPublishDate: Date;
  bookImageUrl: string;
};

type GetBooksResponse = {
  statusCode: number;
  data: Book[];
};

export default async function fetchBookQuery(bookQuery: string) {
  const serverUrl = getServerUrl();
  const books = await fetch(serverUrl + "query/" + bookQuery);
  const response: GetBooksResponse = await books.json();

  if (response.statusCode != StatusCodes.OK) {
    return [];
  }

  return response.data;
}
