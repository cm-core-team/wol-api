package com.wolApi.wolApi;

import org.jsoup.Connection;
import org.jsoup.HttpStatusException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
@RequestMapping("/api/v1/bible-verses")
public class BibleVerseController {
    @GetMapping("/get-verse")
    public Verse getVerse() throws IOException {
        Document doc = Jsoup.connect("https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/1/1#study=discover&v=1:1:1")
                .get();
        doc.select("p").forEach(System.out::println);

        return new Verse("Welcome to the java port of this app");
    }

}
