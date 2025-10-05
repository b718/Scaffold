import type { Express } from "express";
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import getBooks from "../handlers/get-books/getBooks";
import getBook from "../handlers/get-book/getBook";
import getBookQuery from "../handlers/get-book-query/getBookQuery";
import getDatabaseClient from "../database/createDatabaseClient";

const prismaClient = getDatabaseClient();
const app: Express = express();
app.use(cors());
app.get("/books", getBooks(prismaClient));
app.get("/book/:bookId", getBook(prismaClient));
app.get("/query/:bookQuery", getBookQuery(prismaClient));

module.exports.handlers = serverless(app);
