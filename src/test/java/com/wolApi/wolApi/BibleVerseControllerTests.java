package com.wolApi.wolApi;

import com.wolApi.wolApi.controllers.BibleVerseController;
import com.wolApi.wolApi.records.Verse;
import com.wolApi.wolApi.services.BibleVerseService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@WebMvcTest(BibleVerseController.class)
public class BibleVerseControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private BibleVerseService service;

    @Test
    public void returnSpecificVerse() throws Exception {
        Verse testVerse = new Verse("In the beginning God created the heavens and the earth.");

        given(service.getVerse("1", "1", "1")).willReturn(testVerse);

        mvc.perform(get("/api/v1/bible-verses/get-verse/1/1/1").contentType(MediaType.APPLICATION_JSON));
    }
}
