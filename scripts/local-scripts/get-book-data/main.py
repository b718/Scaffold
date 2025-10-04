
import json

JSON_FILE = "books.json"

def create_book_title(book_title: str) -> str:
    lower_case_book_title = []
    split_book = book_title.split(" ")
    
    for section in split_book:
        lower_case_book_title.append(section.lower())
    
    return "_".join(lower_case_book_title)

def load_all_json_books():
    with open(JSON_FILE, 'r') as file:
        data = json.load(file)
        return data

def main():
    data = load_all_json_books()
    for book in data:
        book_title = create_book_title(book["bookTitle"])
        with open(f"{book_title}.json", "w") as file:
            json.dump(book, file, indent=2)
        
if __name__ == '__main__':
    main()