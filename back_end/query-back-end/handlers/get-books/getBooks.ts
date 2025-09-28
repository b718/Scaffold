import type { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pino from "pino";

type GetBooksDataModel = {
  bookId: string;
  bookAuthor: string;
  bookTitle: string;
  bookImageUrl: string;
};

type GetBooksResponse = {
  statusCode: number;
  data: GetBooksDataModel[];
};

function generateGetBooksResponse(
  statusCode: number,
  data: GetBooksDataModel[]
): GetBooksResponse {
  return { statusCode: statusCode, data: data };
}

export default function getBooks(prismaClient: PrismaClient) {
  return async function (_req: Request, res: Response<GetBooksResponse>) {
    let books: GetBooksDataModel[] = [];
    let statusCode = StatusCodes.OK;
    const logger = pino({ name: "handlers/getBooks" });
    logger.info("processing getBooks request");

    try {
      books = await prismaClient.books.findMany({
        select: {
          bookId: true,
          bookAuthor: true,
          bookTitle: true,
          bookImageUrl: true,
        },
      });
    } catch (error: unknown) {
      logger.error(error, "experienced error");
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    res.send(generateGetBooksResponse(statusCode, books));
    if (statusCode == StatusCodes.OK) {
      logger.info("response sent successfully");
    } else {
      logger.info(
        "reponse was not sent successfully, status code: " + statusCode
      );
    }
  };
}
