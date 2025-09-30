import { StatusCodes } from "http-status-codes";
import getServerUrl from "../../../../../utilities/getServerUrl";

export type Book = {
  bookId: string;
  bookAuthor: string;
  bookChapters: string[];
  bookTitle: string;
  bookPublishDate: string;
  bookImageUrl: string;
};

type GetBooksResponse = {
  statusCode: number;
  data: Book;
};

export default async function fetchBook(bookId: string): Promise<Book> {
  const serverUrl = getServerUrl();
  const book = await fetch(serverUrl + "book/" + bookId);
  const response: GetBooksResponse = await book.json();

  if (response.statusCode != StatusCodes.OK) {
    throw Error("unable to get book, please try again");
  }

  return response.data;
}
