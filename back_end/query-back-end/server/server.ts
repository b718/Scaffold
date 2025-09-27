import express from "express";
import cors from "cors";
import type { Express } from "express";
import getBooks from "../handlers/get_books/getBooks";

// dotenv.config(); // Load environment variables from .env file

export default async function startServer() {
  const app: Express = express();
  app.use(cors());

  const port = process.env.PORT || 3001;

  app.get("/books", getBooks);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
