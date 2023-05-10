package com.wolApi.wolApi;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.util.LinkedList;


@RestController
@RequestMapping("/api/v1/bible-verses")
public class BibleVerseController {
    @GetMapping("/get-verse/{book}/{chapter}")
    public VerseList getVerse(
            @PathVariable("book") String book,
            @PathVariable("chapter") String chapter) throws IOException {
        Document doc = Jsoup.connect(
                AppSettings.getInstance().mainVerseURL(book, chapter)
        ).get();
        LinkedList<String> verses = new LinkedList<String>();
        for (Element element : doc.select(".v")) {
            String verse = element
                    .text()
                    .replaceAll("[0-9+*]", "")
                    .stripLeading()
                    .stripTrailing();
            verses.add(verse);
        }

        return new VerseList(verses);
    }
}
