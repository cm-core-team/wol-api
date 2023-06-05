package com.wolApi.wolApi.api.bibleVerses.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "bible-verses")
public class BibleVerse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String verse;
    private int verseNum;
    private int chapter;
    private String bookName;
    private int bookNum;
    private int numVersesInChapter;
    private int numChaptersInBook;
    private String language;

    public BibleVerse() {
    }

    public BibleVerse(Long id, String verse, int verseNum, int chapter, String bookName, int bookNum, int numVersesInChapter, int numChaptersInBook, String language) {
        this.id = id;
        this.verse = verse;
        this.verseNum = verseNum;
        this.chapter = chapter;
        this.bookName = bookName;
        this.bookNum = bookNum;
        this.numVersesInChapter = numVersesInChapter;
        this.numChaptersInBook = numChaptersInBook;
        this.language = language;
    }

    public BibleVerse(String verse, int verseNum, int chapter, String bookName, int bookNum, int numVersesInChapter, int numChaptersInBook, String language) {
        this.verse = verse;
        this.verseNum = verseNum;
        this.chapter = chapter;
        this.bookName = bookName;
        this.bookNum = bookNum;
        this.numVersesInChapter = numVersesInChapter;
        this.numChaptersInBook = numChaptersInBook;
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

    public int getChapter() {
        return chapter;
    }

    public void setChapter(int chapter) {
        this.chapter = chapter;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public int getBookNum() {
        return bookNum;
    }

    public void setBookNum(int bookNum) {
        this.bookNum = bookNum;
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

    public String getLanguage() {
        return this.language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
