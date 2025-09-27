import type { Books, PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pino from "pino";

type Book = Books | null;
type GetBookResponse = {
  statusCode: number;
  data: Book;
};

function generateGetBookResponse(
  statusCode: number,
  data: Book
): GetBookResponse {
  return { statusCode: statusCode, data: data };
}

export default function getBook(prismaClient: PrismaClient) {
  return async function (req: Request, res: Response) {
    let book: Book = null;
    let statusCode = StatusCodes.OK;
    const bookId = req.params.bookId;
    const logger = pino({ name: "handlers/getBook" });
    if (!bookId) {
      logger.error("bookId is not valid");
      res.send(generateGetBookResponse(StatusCodes.BAD_REQUEST, null));
      return;
    }
    logger.info("processing getBook request for bookId: " + bookId);

    try {
      book = await prismaClient.books.findUnique({
        where: {
          bookId: bookId,
        },
      });
    } catch (error) {
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      logger.error("experienced error: " + error);
    }

    res.send(generateGetBookResponse(statusCode, book));
    if (statusCode == StatusCodes.OK) {
      logger.info("response sent successfully");
    } else {
      logger.info(
        "reponse was not sent successfully, status code: " + statusCode
      );
    }
  };
}
