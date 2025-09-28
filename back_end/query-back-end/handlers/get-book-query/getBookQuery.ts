import type { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pino from "pino";

type GetBookQueryDataModel = {
  bookId: string;
  bookAuthor: string;
  bookTitle: string;
  bookImageUrl: string;
};

type GetBookQueryResponse = {
  statusCode: number;
  data: GetBookQueryDataModel[];
};

function generateGetBookQueryResponse(
  statusCode: number,
  data: GetBookQueryDataModel[]
): GetBookQueryResponse {
  console.log(data);
  return { statusCode: statusCode, data: data };
}

export default function getBookQuery(prismaClient: PrismaClient) {
  return async function (req: Request, res: Response) {
    let books: GetBookQueryDataModel[] = [];
    let statusCode = StatusCodes.OK;
    let bookQuery = req.params.bookQuery;
    const logger = pino({ name: "handlers/getBookQuery" });
    if (!bookQuery) {
      logger.error("bookQuery is not valid");
      res.send(generateGetBookQueryResponse(StatusCodes.BAD_REQUEST, []));
      return;
    }
    bookQuery = decodeURI(bookQuery);
    logger.info("processing getBookQuery request for bookQuery: " + bookQuery);

    try {
      books = await prismaClient.books.findMany({
        where: {
          bookTitle: {
            contains: bookQuery,
            mode: "insensitive",
          },
        },
        select: {
          bookId: true,
          bookAuthor: true,
          bookTitle: true,
          bookImageUrl: true,
        },
      });
    } catch (error) {
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      logger.error("experienced error: " + error);
    }

    res.send(generateGetBookQueryResponse(statusCode, books));
    if (statusCode == StatusCodes.OK) {
      logger.info("response sent successfully");
    } else {
      logger.info(
        "reponse was not sent successfully, status code: " + statusCode
      );
    }
  };
}
