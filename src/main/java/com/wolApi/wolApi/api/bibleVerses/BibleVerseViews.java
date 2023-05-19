package com.wolApi.wolApi.api.bibleVerses;

import com.wolApi.wolApi.api.bibleVerses.dtos.Verse;
import com.wolApi.wolApi.api.bibleVerses.dtos.VerseList;
import com.wolApi.wolApi.api.bibleVerses.services.BibleVerseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;


@RestController
@RequestMapping(path = "/api/v1/bible-verses")
public class BibleVerseViews {
    private final BibleVerseService bibleVerseService;

    @Autowired
    public BibleVerseViews(BibleVerseService bibleVerseService) {
        this.bibleVerseService = bibleVerseService;
    }
    @GetMapping("/get-verse/{bookNum}/{chapterNum}/{verseNum}")
    public Verse getVerse(@PathVariable("bookNum") String bookNum,
                          @PathVariable("chapterNum") String chapterNum,
                          @PathVariable("verseNum") String verseNum) throws IOException, InterruptedException {
        return new Verse(
                bibleVerseService.getVerse(bookNum, chapterNum, verseNum),
                bibleVerseService.getNumVersesInChapter(bookNum, chapterNum),
                bibleVerseService.getNumChaptersInBook(bookNum),
                bibleVerseService.getBookName(bookNum)
        );
    }

    @GetMapping("/get-verse/{book}/{chapter}")
    public VerseList getVerses(@PathVariable("bookNum") String bookNum,
                               @PathVariable("chapterNum") String chapterNum) throws IOException {
        return new VerseList(
                bibleVerseService.getVersesInChapter(bookNum, chapterNum)
        );
    }
}
