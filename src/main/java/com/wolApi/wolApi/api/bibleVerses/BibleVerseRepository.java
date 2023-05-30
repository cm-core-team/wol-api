package com.wolApi.wolApi.api.bibleVerses;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface BibleVerseRepository extends JpaRepository<BibleVerse, Long> {
    @Query("SELECT b FROM BibleVerse b WHERE b.bookName = ?1 AND b.numChaptersInBook = ?2 AND b.numVersesInChapter = ?3")
    BibleVerse findBibleVerseByBookNameAndChapterNumAndVerseNum(String bookName,
                                                                          String chapterNum,
                                                                          String verseNum);
}
