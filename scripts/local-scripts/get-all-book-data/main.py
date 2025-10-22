import psycopg2
from dotenv import load_dotenv
import os
import json

load_dotenv()

SELECT_ALL_QUERY = """
    SELECT * FROM "Books";
"""

def main():
    print("oh hello")
    try:
        postgres_connection = psycopg2.connect(
            os.getenv("DATABASE_DSN")
        )
        database_indexer = postgres_connection.cursor()
        database_indexer.execute(SELECT_ALL_QUERY)
        books = database_indexer.fetchall()

        for book in books:
            book_dict = {}
            book_id, book_author, book_chapters, book_date, book_image_url, book_title = book

            book_dict["bookId"] = book_id
            book_dict["bookAuthor"] = book_author
            book_dict["bookChapters"] = book_chapters
            book_dict["bookPublishDate"] = book_date.isoformat()
            book_dict["bookImageUrl"] = book_image_url
            book_dict["bookTitle"] = book_title

            with open("books-to-be-inserted.json", "a") as json_file:
                json.dump(book_dict, json_file, indent=4)
                json_file.write(",")
            
    except Exception as e:
        print(e)
        
    finally:
        if postgres_connection:
            postgres_connection.close()

if __name__ == "__main__":
    main()