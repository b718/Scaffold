from pathlib import Path
import psycopg2
from dotenv import load_dotenv
import os
import shutil

load_dotenv()

src_dir = Path("book-picture")       # adjust to where your originals live
dest_dir = Path("renamed-images")     # adjust to where you want the copies
SELECT_ALL_QUERY = """
    SELECT * FROM "Books";
"""

def format_title(title: str) -> str:
    lower_case_book_title = []
    split_book = title.split(" ")
    
    for section in split_book:
        lower_case_book_title.append(section.lower())
    
    return "_".join(lower_case_book_title)

def parse_through_image_id_text_file():
    try:
        postgres_connection = psycopg2.connect(
            os.getenv("DATABASE_DSN")
        )
        database_indexer = postgres_connection.cursor()
        database_indexer.execute(SELECT_ALL_QUERY)
        books = database_indexer.fetchall()

        for book in books:
            book_id, _, _, _, _, book_title = book
            formatted_title = format_title(book_title)
            print(formatted_title, book_id)

            matches = list(src_dir.glob(f"{formatted_title}.*"))
            
            if not matches:
                print("no matches found for: ", book_title)
                continue
            
            source_path = matches[0]
            target_path = dest_dir / f"{book_id}{source_path.suffix.lower()}"
            shutil.copy2(source_path, target_path)
    except Exception as e:
        print(e)
    
    finally:
        if postgres_connection:
            postgres_connection.close()

def main():
    print("oh hello")
    parse_through_image_id_text_file()

if __name__ == "__main__":
    main()