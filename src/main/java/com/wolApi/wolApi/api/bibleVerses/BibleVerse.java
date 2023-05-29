package com.wolApi.wolApi.api.bibleVerses;

import jakarta.persistence.*;

@Entity
@Table(name = "bible-verses")
public class BibleVerse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String verse;
    private int numVersesInChapter;
    private int numChaptersInBook;
    private String bookName;
    private String language;

    public BibleVerse() {
    }

    public BibleVerse(Long id, String verse, int numVersesInChapter, int numChaptersInBook, String bookName, String language) {
        this.id = id;
        this.verse = verse;
        this.numVersesInChapter = numVersesInChapter;
        this.numChaptersInBook = numChaptersInBook;
        this.bookName = bookName;
        this.language = language;
    }

    public BibleVerse(String verse, int numVersesInChapter, int numChaptersInBook, String bookName, String language) {
        this.verse = verse;
        this.numVersesInChapter = numVersesInChapter;
        this.numChaptersInBook = numChaptersInBook;
        this.bookName = bookName;
        this.language = language;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVerse() {
        return verse;
    }

    public void setVerse(String verse) {
        this.verse = verse;
    }

    public int getNumVersesInChapter() {
        return numVersesInChapter;
    }

    public void setNumVersesInChapter(int numVersesInChapter) {
        this.numVersesInChapter = numVersesInChapter;
    }

    public int getNumChaptersInBook() {
        return numChaptersInBook;
    }

    public void setNumChaptersInBook(int numChaptersInBook) {
        this.numChaptersInBook = numChaptersInBook;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getLanguage() {
        return this.language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
