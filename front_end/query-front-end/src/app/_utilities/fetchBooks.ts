import { StatusCodes } from "http-status-codes";
import getServerUrl from "../../../utilities/getServerUrl";

export type Books = {
  bookId: string;
  bookAuthor: string;
  bookTitle: string;
  bookImageUrl: string;
};

type GetBooksResponse = {
  statusCode: number;
  data: Books[];
};

export default async function fetchBooks(): Promise<Books[]> {
  const serverUrl = getServerUrl();
  const books = await fetch(serverUrl + "books");
  const response: GetBooksResponse = await books.json();

  if (response.statusCode != StatusCodes.OK) {
    return [];
  }

  return response.data;
}
