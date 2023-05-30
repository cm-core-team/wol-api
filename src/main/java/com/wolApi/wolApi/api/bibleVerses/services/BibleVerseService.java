package com.wolApi.wolApi.api.bibleVerses.services;

import com.wolApi.wolApi.api.bibleVerses.BibleVerse;
import com.wolApi.wolApi.api.bibleVerses.BibleVerseRepository;
import org.springframework.stereotype.Service;

import java.util.LinkedList;


@Service
public class BibleVerseService {
    private final BibleVerseRepository bibleVerseRepository;

    public BibleVerseService(BibleVerseRepository bibleVerseRepository) {
        this.bibleVerseRepository = bibleVerseRepository;
    }

    /**
     * Get a specific verses given book, chapter, and verse
     */
    public BibleVerse getBibleVerse(int bookNum, int chapterNum, int verseNum) {
        return bibleVerseRepository.findBibleVerse(bookNum, chapterNum, verseNum);
    }

    /**
     * Gets the verses in a chapter in a list.
     */
    public LinkedList<BibleVerse> getVersesInChapter(
            int bookNum,
            int chapter) {

        return bibleVerseRepository.findAllVersesInChapter(bookNum, chapter);
    }

}
