package com.wolApi.wolApi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;


@RestController
@RequestMapping("/api/v1/bible-verses")
public class BibleVerseController {
    @GetMapping("/get-verse/{book}/{chapter}")
    public VerseList getVerse(
            @PathVariable("book") String book,
            @PathVariable("chapter") String chapter) throws IOException {
        return new VerseList(
                VerseUtils.getVersesInChapter(book, chapter)
        );
    }
}
