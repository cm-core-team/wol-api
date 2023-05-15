package com.wolApi.wolApi.utils;

import com.wolApi.wolApi.AppSettings;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import javax.print.Doc;
import java.io.IOException;
import java.util.LinkedList;

public class VerseUtils {
    /**
     * Get a specific verses given book, chapter, and verse
     *
     * @param book
     * @param chapter
     * @param verse
     * @return Single verse text
     * @throws IOException
     */
    public static String getVerse(String book, String chapter, String verse) throws IOException {
        Document doc = Jsoup.connect(
                AppSettings.getInstance().mainVerseURL(book, chapter)
        ).get();
        String verseIdString = AppSettings.getInstance().getVerseID(book, chapter, verse);

        return doc.select("#" + verseIdString)
                .text()
                .replaceAll("[0-9+*]", "")
                .stripLeading()
                .stripTrailing();
    }

    /**
     * Gets the verses in a chapter in a list.
     *
     * @param book
     * @param chapter
     * @return Verses in the chapter
     * @throws IOException
     */
    public static LinkedList<String> getVersesInChapter(
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
