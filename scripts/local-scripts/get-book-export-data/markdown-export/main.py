import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

SELECT_ALL_QUERY = """
    SELECT * FROM "Books";
"""

def get_mark_down_content(book_chapters: list[str]) -> str:
    result_string = []
    for index, chapter in enumerate(book_chapters):
        result_string.append(f"### Chapter {index + 1}: {chapter}\n")
    
    return "\n".join(result_string)

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
            book_id, _, book_chapters, _, _, _ = book
            file_name = f"{book_id}.md"
            notion_file_path, obsidian_file_path = f"notion/{file_name}", f"obsidian/{file_name}"
            mark_down_content = get_mark_down_content(book_chapters)

            with open(notion_file_path, "w") as file:
                file.write(mark_down_content)

            with open(obsidian_file_path, "w") as file:
                file.write(mark_down_content)

    except Exception as e:
        print(e)
        
    finally:
        if postgres_connection:
            postgres_connection.close()

if __name__ == "__main__":
    main()