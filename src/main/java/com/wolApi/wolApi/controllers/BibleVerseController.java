package com.wolApi.wolApi.controllers;

import com.wolApi.wolApi.records.Verse;
import com.wolApi.wolApi.utils.VerseUtils;
import com.wolApi.wolApi.records.VerseList;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;


@RestController
@RequestMapping("/api/v1/bible-verses")
public class BibleVerseController {
    @GetMapping("/get-verse/{book}/{chapter}/{verse}")
    public Verse getVerse(@PathVariable("book") String book,
                          @PathVariable("chapter") String chapter,
                          @PathVariable("verse") String verse) throws IOException {
        return new Verse(VerseUtils.getVerse(book, chapter, verse));
    }


    @GetMapping("/get-verse/{book}/{chapter}")
    public VerseList getVerses(
            @PathVariable("book") String book,
            @PathVariable("chapter") String chapter) throws IOException {
        return new VerseList(
                VerseUtils.getVersesInChapter(book, chapter)
        );
    }
}
