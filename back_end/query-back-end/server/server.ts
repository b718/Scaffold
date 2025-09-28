import type { Express } from "express";
import type { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import getBooks from "../handlers/get-books/getBooks";
import getBook from "../handlers/get-book/getBook";
import getBookQuery from "../handlers/get-book-query/getBookQuery";

// dotenv.config(); // Load environment variables from .env file

export default async function startServer(prismaClient: PrismaClient) {
  const app: Express = express();
  app.use(cors());

  const port = process.env.PORT || 3001;

  app.get("/books", getBooks(prismaClient));
  app.get("/book/:bookId", getBook(prismaClient));
  app.get("/query/:bookQuery", getBookQuery(prismaClient));

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
