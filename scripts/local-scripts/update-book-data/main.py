import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

SELECT_ALL_QUERY = """
    SELECT * FROM "Books";
"""

UPDATE_QUERY = """
    UPDATE "Books"
    SET "bookChapters" = ARRAY[
    'Introduction',
    '1. Master Your Emotional Self: The Law of Irrationality',
    '2. Transform Self-love into Empathy: The Law of Narcissism',
    '3. See Through People’s Masks: The Law of Role-playing',
    '4. Determine the Strength of People’s Character: The Law of Compulsive Behavior',
    '5. Become an Elusive Object of Desire: The Law of Covetousness',
    '6. Elevate Your Perspective: The Law of Shortsightedness',
    '7. Soften People’s Resistance by Confirming Their Self-Opinion: The Law of Defensiveness',
    '8. Change Your Circumstances by Changing Your Attitude: The Law of Self-Sabotage',
    '9. Confront Your Dark Side: The Law of Repression',
    '10. Beware the Fragile Ego: The Law of Envy',
    '11. Know Your Limits: The Law of Grandiosity',
    '12. Reconnect to the Masculine or Feminine Within You: The Law of Gender Rigidity',
    '13. Advance with a Sense of Purpose: The Law of Aimlessness',
    '14. Resist the Downward Pull of the Group: The Law of Conformity',
    '15. Make Them Want to Follow You: The Law of Fickleness',
    '16. See the Hostility Behind the Friendly Façade: The Law of Aggression',
    '17. Seize the Historical Moment: The Law of Generational Myopia',
    '18. Meditate on Our Common Mortality: The Law of Death Denial'
  ]
  WHERE "bookTitle" = 'The Laws of Human Nature';
"""

def main():
    print("oh hello")
    book_of_interest = "The Laws of Human Nature"

    try:
        postgres_connection = psycopg2.connect(
            os.getenv("DATABASE_DSN")
        )
        database_indexer = postgres_connection.cursor()
        database_indexer.execute(SELECT_ALL_QUERY)
        books = database_indexer.fetchall()

        for book in books:
            _, _, _, _, _, book_title = book

            if book_title == book_of_interest:
                database_indexer.execute(UPDATE_QUERY)
                postgres_connection.commit()
                break
            
    except Exception as e:
        print(e)
        
    finally:
        if postgres_connection:
            postgres_connection.close()

if __name__ == "__main__":
    main()