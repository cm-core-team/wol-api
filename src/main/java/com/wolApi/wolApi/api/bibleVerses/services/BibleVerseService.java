package com.wolApi.wolApi.api.bibleVerses.services;

import com.wolApi.wolApi.AppSettings;
import com.wolApi.wolApi.api.bibleVerses.BibleVerse;
import com.wolApi.wolApi.api.bibleVerses.BibleVerseRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.LinkedList;


@Service
public class BibleVerseService {
    private final BibleVerseRepository bibleVerseRepository;
    public BibleVerseService(BibleVerseRepository bibleVerseRepository) {
        this.bibleVerseRepository = bibleVerseRepository;
    }

    /**
     * Get a specific verses given book, chapter, and verse
     */
    public BibleVerse getBibleVerse(String bookNum, String chapterNum, String verseNum) {
        return bibleVerseRepository.findBibleVerseByBookNameAndChapterNumAndVerseNum(bookNum, chapterNum, verseNum);
    }

    /**
     * Gets the verses in a chapter in a list.
     */
    public LinkedList<String> getVersesInChapter(
            String book,
            String chapter) throws IOException {
        // HTML Parser
        Document doc = Jsoup.connect(
                AppSettings.getInstance().mainVerseURL(book, chapter)
        ).get();

        LinkedList<String> verses = new LinkedList<>();
        for (Element element : doc.select(".v")) {
            String verse = element.text()
                    // Remove extraneous HTML syntax
                    .replaceAll("[0-9+*]", "")

                    // Remove leftover whitespace (leading/trailing)
                    .stripLeading()
                    .stripTrailing();
            verses.add(verse);
        }

        return verses;
    }

}
