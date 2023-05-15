package com.wolApi.wolApi.controllers;

import com.wolApi.wolApi.records.Verse;
import com.wolApi.wolApi.services.BibleVerseService;
import com.wolApi.wolApi.utils.VerseUtils;
import com.wolApi.wolApi.records.VerseList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;


@RestController
@RequestMapping(path = "/api/v1/bible-verses")
public class BibleVerseController {
    private final BibleVerseService bibleVerseService;

    @Autowired
    public BibleVerseController(BibleVerseService bibleVerseService) {
        this.bibleVerseService = bibleVerseService;
    }
    @GetMapping("/get-verse/{book}/{chapter}/{verse}")
    public Verse getVerse(@PathVariable("book") String book,
                          @PathVariable("chapter") String chapter,
                          @PathVariable("verse") String verse) throws IOException {
        return bibleVerseService.getVerse(book, chapter,
                verse);
    }

    @GetMapping("/get-verse/{book}/{chapter}")
    public VerseList getVerses(@PathVariable("book") String book,
                               @PathVariable("chapter") String chapter) throws IOException {
        return bibleVerseService.getVerses(book, chapter);
    }
}
