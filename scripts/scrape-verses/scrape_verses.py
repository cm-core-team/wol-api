import re
import json
import requests

from tqdm import tqdm
from bs4 import BeautifulSoup
from requests import Session
from concurrent.futures import ThreadPoolExecutor


def main():
    extractor = BibleExtractor()

    # list of all possible books
    book_nums = list(range(1, 67))

    # map of books to chapters to verse content
    data = {}
    urls = []

    # generate a list of URLs for each chapter
    for book_num in tqdm(book_nums, desc="Generating URLs"):
        json_data = extractor.get_json_data_for_extra_verse_info(book_num)
        num_chapters = extractor.get_num_chapters_in_book(json_data)

        for chapter_num in range(1, num_chapters + 1):
            url = AppSettings.main_verse_url(book_num, chapter_num)
            urls.append(url)

    def fetch_and_extract(args):
        url, session = args
        response = session.get(url)

        if response.status_code == 200:
            # Extract book_num and chapter_num from the URL
            book_num, chapter_num = re.findall(r"/(\d+)/(\d+)", url)[0]
            book_num, chapter_num = int(book_num), int(chapter_num)
            
            # Extract verses
            chapter_data = {}
            json_data = extractor.get_json_data_for_extra_verse_info(book_num)
            num_verses = extractor.get_num_verses_in_chapter(chapter_num, json_data)
            for verse_num in range(1, num_verses + 1):
                if not response.content:
                    continue

                try:
                    verse = extractor.extract_verse_from_html(book_num, chapter_num, verse_num, response.content)
                except AttributeError as e:
                    print(f"Error extracting verse: {book_num} {chapter_num} {verse_num}")
                    continue
                chapter_data[verse_num] = verse
            
            return book_num, chapter_num, chapter_data
        return None
    
    with Session() as session:
        # Scrape each URL and map book to chapters to verses content
        with ThreadPoolExecutor(max_workers=10) as executor:
            args = [(url, session) for url in urls]
            for result in tqdm(executor.map(fetch_and_extract, args), total=len(urls), desc="Scraping"):
                if result:
                    book_num, chapter_num, chapter_data = result
                    if book_num not in data:
                        data[book_num] = {}
                    data[book_num][chapter_num] = chapter_data
    
    with open("verses.json", "w") as f:
        json.dump(data, f)


class BibleExtractor:

    def extract_verse_from_html(self, book_num, chapter_num, verse_num, html_content):
        soup = BeautifulSoup(html_content, 'html.parser')
        verse_id_string = self.construct_verse_id(book_num, chapter_num, verse_num)
        verse = soup.select_one(f"#{verse_id_string}").text
        cleaned_verse = re.sub(r"[0-9+*]", "", verse).strip()

        return cleaned_verse

    def get_json_data_for_extra_verse_info(self, book_num):
        url = f"https://b.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?pub=nwt&langwritten=E&txtCMSLang=E&fileformat=mp3&booknum={book_num}"
        response = requests.get(url)
        return json.loads(response.text)

    def construct_verse_id(self, book_num, chapter_num, verse_num):
        return f"v{book_num}-{chapter_num}-{verse_num}-1"

    def get_num_verses_in_chapter(self, chapter_num, json_data):
        num_verses = len(json_data["files"]["E"]["MP3"][int(chapter_num) - 1]["markers"]["markers"])
        return num_verses

    def get_num_chapters_in_book(self, json_data):
        num_chapters = len(json_data["files"]["E"]["MP3"])
        return num_chapters

    def get_book_name(self, json_data):
        book_name = json_data["pubName"]
        return book_name

class AppSettings:
    @staticmethod
    def main_verse_url(book_num, chapter_num):
        return f"https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/{book_num}/{chapter_num}#study=discover"


if __name__ == "__main__":
    main()
