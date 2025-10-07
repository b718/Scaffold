from book_exports.markdown import exports_markdown
from book_exports.text import exports_text
from database import database_accessor
from dotenv import load_dotenv

load_dotenv()

def main():
    db = database_accessor.DatabaseAccessor()
    all_books_in_database: list[database_accessor.Book] = db.get_all_books_in_database()

    markdown_exporter = exports_markdown.ExportsMarkdown()
    text_exporter = exports_text.ExportsText()

    markdown_exporter.export(all_books_in_database)
    text_exporter.export(all_books_in_database)

if __name__ == "__main__":
    main()