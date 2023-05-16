package com.wolApi.wolApi.unit;

import com.wolApi.wolApi.api.getVerse.services.BibleVerseService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.given;

@WebMvcTest(BibleVerseService.class)
public class BibleVerseServiceTests {
    @MockBean
    private BibleVerseService service;

    BibleVerseServiceTests() {
        service = new BibleVerseService();
    }

//    @Test
//    public void returnSpecificVerse() throws Exception {
//        String testVerse = "In the beginning God created the heavens and the earth.";
//        System.out.println(service.getVerse("1", "1", "1"));
//        given(service.getVerse("1", "1", "1")).willReturn(testVerse);
//    }

}
