import type { Books, PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pino from "pino";

type GetBooksResponse = {
  statusCode: number;
  data: Books[];
};

function generateGetBooksResponse(
  statusCode: number,
  data: Books[]
): GetBooksResponse {
  return { statusCode: statusCode, data: data };
}

export default function getBooks(prismaClient: PrismaClient) {
  return async function (_req: Request, res: Response<GetBooksResponse>) {
    const logger = pino({ name: "handlers/getBooks" });
    logger.info("processing getBooks request");

    let books: Books[] = [];
    let statusCode = StatusCodes.OK;

    try {
      books = await prismaClient.books.findMany();
    } catch (error: unknown) {
      logger.error("experienced error: " + error);
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    const getBooksResponse = generateGetBooksResponse(statusCode, books);
    res.send(getBooksResponse);
    logger.info("response sent successfully with length: " + books.length);
  };
}
