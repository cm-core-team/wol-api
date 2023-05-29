package com.wolApi.wolApi.api.bibleVerses;

import com.wolApi.wolApi.api.bibleVerses.dtos.VerseList;
import com.wolApi.wolApi.api.bibleVerses.services.BibleVerseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@RequestMapping(path = "/api/v1/bible-verses")
public class BibleVerseViews {
    private final BibleVerseService bibleVerseService;

    @Autowired
    public BibleVerseViews(BibleVerseService bibleVerseService) {
        this.bibleVerseService = bibleVerseService;
    }
    @GetMapping("/get-verse")
    public BibleVerse getVerse(@RequestParam String bookNum,
                               @RequestParam String chapterNum,
                               @RequestParam String verseNum) throws IOException, InterruptedException {
        return bibleVerseService.getBibleVerse(bookNum, chapterNum, verseNum);
    }

    @GetMapping("/get-verses")
    public VerseList getVerses(@RequestParam String bookNum,
                               @RequestParam String chapterNum) throws IOException {
        return new VerseList(
                bibleVerseService.getVersesInChapter(bookNum, chapterNum)
        );
    }
}
