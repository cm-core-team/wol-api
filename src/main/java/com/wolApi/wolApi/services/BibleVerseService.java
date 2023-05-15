package com.wolApi.wolApi.services;

import com.wolApi.wolApi.records.Verse;
import com.wolApi.wolApi.records.VerseList;
import com.wolApi.wolApi.utils.VerseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;

@Service
public class BibleVerseService {

    @Autowired
    public BibleVerseService() {

    }

    public Verse getVerse(String book,
                          String chapter,
                          String verse) throws IOException {
        return new Verse(VerseUtils.getVerse(book, chapter, verse));
    }

    public VerseList getVerses(
            String book,
            String chapter) throws IOException {
        return new VerseList(
                VerseUtils.getVersesInChapter(book, chapter)
        );
    }
}
