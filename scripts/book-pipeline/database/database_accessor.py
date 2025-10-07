import datetime
import psycopg2
import os
import logging
from dataclasses import dataclass

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("database_accessor")

@dataclass
class Book:
    book_id: str
    book_author: str
    book_chapters: list[str]
    book_date: datetime.datetime
    book_image_url: str
    book_title: str
    
class DatabaseAccessor:
    SELECT_ALL_QUERY = """
        SELECT * FROM "Books";
    """

    def get_all_books_in_database(self) -> list[Book]:
        logger.info("getting all books in database")
        books: list[Book] = []

        try:
            postgres_connection = psycopg2.connect(
                os.getenv("DATABASE_DSN")
            )
            database_indexer = postgres_connection.cursor()
            database_indexer.execute(DatabaseAccessor.SELECT_ALL_QUERY)
            database_books = database_indexer.fetchall()

            for book in database_books:
                new_book = Book(*book)
                books.append(new_book)

        except Exception as e:
            logger.error(e)
            raise e
            
        finally:
            if postgres_connection:
                postgres_connection.close()

        print("[INFO]: successfully got all books")
        return books
        