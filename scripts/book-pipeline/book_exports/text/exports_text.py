import logging

from book_exports.interface.exports_interface import ExportsInterface
from database import database_accessor

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("exports_text")

class ExportsText(ExportsInterface):
    ANKI_FILE_PATH = "./export_files/anki"

    def _get_anki_content(self, book_chapters: list[str]) -> str:
        result_string = []
        for index, chapter in enumerate(book_chapters):
            result_string.append(f"Chapter {index + 1}: {chapter}; ''")
        
        return "\n".join(result_string)

    def export(self, books: list[database_accessor.Book]) -> None:
        logger.info("exporting text files")

        try:
            for book in books:
                file_name = f"{book.book_id}.txt"
                anki_file_path = f"{ExportsText.ANKI_FILE_PATH}/{file_name}"
                text_content = self._get_anki_content(book.book_chapters)

                with open(anki_file_path, "w") as file:
                    file.write(text_content)

        except Exception as e:
            logger.error(e)
            raise e
        
        logger.info("succesfully exported text files")
