package com.wolApi.wolApi.api.bibleVerses;

import com.wolApi.wolApi.api.bibleVerses.entities.BibleVerse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BibleVerseRepository extends JpaRepository<BibleVerse, Long> {
    @Query("SELECT b FROM BibleVerse b WHERE b.bookNum = ?1 AND b.chapter = ?2 AND b.verseNum = ?3")
    BibleVerse findBibleVerse(int bookNum,
                             int chapterNum,
                             int verseNum);

    @Query("SELECT * FROM BibleVerse b WHERE b.bookNum = ?1 AND b.chapter = ?2")
    default List<BibleVerse> findAllVersesInChapter(int bookNum,
                                                    int chapterNum) {
        return null;
    }
}
