package com.wolApi.wolApi.api.bibleVerses.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wolApi.wolApi.AppSettings;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.LinkedList;


@Service
public class BibleVerseService {
    public BibleVerseService() {}

    private String extractVerseFromHtml(String bookNum, String chapterNum, String verseNum) throws IOException {
        Document doc = Jsoup.connect(
                AppSettings.getInstance().mainVerseURL(bookNum, chapterNum)
        ).get();
        String verseIdString = constructVerseId(bookNum, chapterNum, verseNum);

        return doc.select("#" + verseIdString)
                .text()
                .replaceAll("[0-9+*]", "")
                .stripLeading()
                .stripTrailing();
    }

    private JsonNode getJsonDataForExtraVerseInfo(URI uri) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri)
                .build();
        String json = HttpClient.newHttpClient()
                .send(request, HttpResponse.BodyHandlers.ofString())
                .body();
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readTree(json);
    }


    private String constructVerseId(String bookNum, String chapterNum, String verseNum) {
        return String.format("v%s-%s-%s-1", bookNum, chapterNum, verseNum);
    }

    /**
     * Get a specific verses given book, chapter, and verse
     */
    public String getVerse(String bookNum, String chapterNum, String verseNum) throws IOException {
        String verse = extractVerseFromHtml(bookNum, chapterNum, verseNum);
        return verse;
    }

    public int getNumChaptersInBook(String bookNum) throws IOException, InterruptedException {
        URI uri = URI.create(String
                .format("https://b.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?pub=nwt&langwritten=E&txtCMSLang=E&fileformat=mp3&booknum=%s",
                        bookNum));
        JsonNode json = getJsonDataForExtraVerseInfo(uri);
        int numChapters = json
                        .get("files")
                        .get("E")
                        .get("MP3")
                        .size();

        return numChapters;
    }

    public int getNumVersesInChapter(String bookNum, String chapterNum) throws IOException, InterruptedException {
        URI uri = URI.create(String
                .format("https://b.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?pub=nwt&langwritten=E&txtCMSLang=E&fileformat=mp3&booknum=%s",
                        bookNum));
        JsonNode json = getJsonDataForExtraVerseInfo(uri);
        int numVerses = json
                        .get("files")
                        .get("E")
                        .get("MP3")
                        .get(Integer.parseInt(chapterNum) - 1)
                        .get("markers")
                        .get("markers")
                        .size();

        return numVerses;
    }

    public String getBookName(String bookNum) throws IOException, InterruptedException {
        URI uri = URI.create(String
                .format("https://b.jw-cdn.org/apis/pub-media/GETPUBMEDIALINKS?pub=nwt&langwritten=E&txtCMSLang=E&fileformat=mp3&booknum=%s",
                        bookNum));
        JsonNode json = getJsonDataForExtraVerseInfo(uri);
        String bookName = json
                        .get("pubName")
                        .asText();

        return bookName;
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
