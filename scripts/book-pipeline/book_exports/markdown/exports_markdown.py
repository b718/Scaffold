import logging
import os
from book_exports.interface.exports_interface import ExportsInterface
from database import database_accessor

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("exports_text")

class ExportsMarkdown(ExportsInterface):
    NOTION_FILE_PATH = "./export_files/notion"
    OBSIDIAN_FILE_PATH = "./export_files/obsidian"

    def _get_mark_down_content(self, book_chapters: list[str]) -> str:
        result_string = []
        for index, chapter in enumerate(book_chapters):
            result_string.append(f"### Chapter {index + 1}: {chapter}\n")
        
        return "\n".join(result_string)
    
    def export(self, books: list[database_accessor.Book]) -> None:
        logger.info("exporting markdown files")

        try:
            for book in books:
                file_name = f"{book.book_id}.md"
                notion_file_path, obsidian_file_path = f"{ExportsMarkdown.NOTION_FILE_PATH}/{file_name}", f"{ExportsMarkdown.OBSIDIAN_FILE_PATH}/{file_name}"
                mark_down_content = self._get_mark_down_content(book.book_chapters)

                with open(notion_file_path, "w") as file:
                    file.write(mark_down_content)

                with open(obsidian_file_path, "w") as file:
                    file.write(mark_down_content)

        except Exception as e:
            logger.error(e)
            raise e
        
        logger.info("succesfully exported markdown files")