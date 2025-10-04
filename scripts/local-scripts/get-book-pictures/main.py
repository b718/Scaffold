import requests
from bs4 import BeautifulSoup

REQUEST_URL = "https://www.google.com/search?q"

def create_book_title(book_title: str) -> str:
    lower_case_book_title = []
    split_book = book_title.split(" ")
    
    for section in split_book:
        lower_case_book_title.append(section.lower())
    
    return "_".join(lower_case_book_title)

def is_https(url):
    src = url.get("src")
    return "https" in src

def get_image_of_book_html_text(book_name: str, author_name: str):
    image_url = f"{REQUEST_URL}={book_name} {author_name}&tbm=isch"
    response = requests.get(image_url)
    return response.text

def download_image_of_book(book_title: str):
    html_text = get_image_of_book_html_text(book_title, "book")
    soup = BeautifulSoup(html_text, 'html.parser')
    all_images = filter(is_https, soup.find_all('img'))

    image_to_print = None
    for image in all_images:
        if image_to_print:
            break
        image_to_print = image.get("src")

    if image_to_print:
        resp = requests.get(image_to_print, stream=True)
        resp.raise_for_status()
        with open(f"{create_book_title(book_title)}.png", "wb") as f:
            for chunk in resp.iter_content(8192):
                f.write(chunk)
    else:
        print(f"could not find image for book: {book_title} :(")

def main():
    books = [
        "Rich Dad Poor Dad",
        "Think and Grow Rich",
        "The Millionaire Next Door",
        "The Intelligent Investor",
        "I Will Teach You to Be Rich",
        "Your Money or Your Life",
        "Atomic Habits",
        "The 7 Habits of Highly Effective People",
        "Deep Work",
        "So Good They Can’t Ignore You",
        "Make Time",
        "The Power of Now",
        "The Subtle Art of Not Giving a F*ck",
        "Everything is F*cked",
        "Can’t Hurt Me",
        "Never Finished",
        "The Mountain Is You",
        "101 Essays That Will Change the Way You Think",
        "The Alchemist",
        "The 48 Laws of Power",
        "The 33 Strategies of War",
        "The Laws of Human Nature",
        "Ego is the Enemy",
        "The Obstacle is the Way",
        "Discipline is Destiny",
        "The Lean Startup",
        "Zero to One",
        "The $100 Startup",
        "Company of One",
        "Crushing It!",
        "Jab, Jab, Jab, Right Hook",
        "Tools of Titans",
        "Tribe of Mentors",
        "The 4-Hour Workweek",
        "The E-Myth Revisited",
        "Start with Why",
        "Leaders Eat Last",
        "The Infinite Game",
        "How to Win Friends and Influence People",
        "Influence: The Psychology of Persuasion",
        "Pre-Suasion",
        "Drive",
        "Mindset: The New Psychology of Success",
        "Grit",
        "Flow",
        "The Almanack of Naval Ravikant",
        "Show Your Work!",
        "Steal Like an Artist",
        "The Creative Act: A Way of Being",
        "Die With Zero"
    ]

    for book in books:
        download_image_of_book(book)

if __name__ == "__main__":
    main()