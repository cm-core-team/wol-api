package com.wolApi.wolApi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.net.ssl.HttpsURLConnection;
import java.net.URL;
import java.net.URLConnection;

@RestController
@RequestMapping("/api/v1/bible-verses")
public class BibleVerseController {
    @GetMapping("/get-verse")
    public Verse getVerse() {
        URL url = new URL("https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/1/1#study=discover&v=1:1:1");
        HttpsURLConnection con = (HttpsURLConnection) url.openConnection();
        con.setRequestMethod("GET");

        return new Verse("Welcome to the java port of this app");
    }

}
