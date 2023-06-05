package com.wolApi.wolApi.api.bibleVerses;

import com.wolApi.wolApi.api.bibleVerses.entities.BibleVerse;
import com.wolApi.wolApi.api.bibleVerses.services.BibleVerseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "/api/v1/bible-verses")
public class BibleVerseViews {
    private final BibleVerseService bibleVerseService;

    @Autowired
    public BibleVerseViews(BibleVerseService bibleVerseService) {
        this.bibleVerseService = bibleVerseService;
    }
    @GetMapping("/get-verse")
    public BibleVerse getVerse(@RequestParam int bookNum,
                               @RequestParam int chapterNum,
                               @RequestParam int verseNum) {
        return bibleVerseService.getBibleVerse(bookNum, chapterNum, verseNum);
    }

    @GetMapping("/get-verses")
    public List<BibleVerse> getVerses(
                                @RequestParam int bookNum,
                                @RequestParam int chapterNum) {
        return bibleVerseService.getVersesInChapter(bookNum, chapterNum);
    }
}
