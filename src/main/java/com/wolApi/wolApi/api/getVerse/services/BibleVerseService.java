package com.wolApi.wolApi.api.getVerse.services;

import com.wolApi.wolApi.AppSettings;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.LinkedList;


@Service
public class BibleVerseService {

    public BibleVerseService() {}

    private String constructVerseId(String book, String chapter, String verse) {
        return String.format("v%s-%s-%s-1", book, chapter, verse);
    }
    /**
     * Get a specific verses given book, chapter, and verse
     */
    public String getVerse(String book, String chapter, String verse) throws IOException {
        Document doc = Jsoup.connect(
                AppSettings.getInstance().mainVerseURL(book, chapter)
        ).get();
        String verseIdString = constructVerseId(book, chapter, verse);

        return doc.select("#" + verseIdString)
                .text()
                .replaceAll("[0-9+*]", "")
                .stripLeading()
                .stripTrailing();
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
