package com.wolApi.wolApi;

public class AppSettings {
    public static String mainVerseURL(String bookIndex, String verseIndex) {
        return String.format(
                "https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/%s/%s#study=discover",
                bookIndex,
                verseIndex);
    }
}
