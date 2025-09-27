import type { Response } from "express";
import pino from "pino";

type GetBooksResponse = {
  bookId: string;
  bookAuthor: string;
  bookChapters: string[];
  bookTitle: string;
  bookPublishDate: string;
  bookImageUrl: string;
};

export default async function getBooks(res: Response<GetBooksResponse>) {
  // 1. here we will directly fetch all the data from ddb
  // 2. and when it is time to fetch from AWS we will do it.
  const logger = pino({ name: "handlers/getBooks" });
  logger.info("processing request");

  const getBooksResponse: GetBooksResponse = {
    bookId: "1",
    bookAuthor: "Robert Kiyosaki",
    bookChapters: [
      "20 years ... 20/20 hindsight",
      "Introduction",
      "Lesson 1: The rich don't work for money",
      "Lesson 2: Why teach financial literacy?",
      "Lesson 3: Mind your own business",
      "Lesson 4: The history of taxes and the power of corporations",
      "Lesson 5: The rich invent money",
      "Lesson 6: Work to learn, don't work for money",
      "Overcoming obstacles",
      "Getting started",
      "Still want more? Here are some to do's",
      "Final thoughts.",
    ],
    bookTitle: "Rich Dad Poor Dad",
    bookPublishDate: "2000-04-01",
    bookImageUrl: "",
  };

  res.send(getBooksResponse);
  logger.info("response sent successfully");
}
