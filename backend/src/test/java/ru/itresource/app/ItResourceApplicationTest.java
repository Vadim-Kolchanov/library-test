package ru.itresource.app;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ItResourceApplicationTest {

    @Autowired
    private MockMvc mockMvc;

    public static final String URL_STATUS = "http://localhost:8080/api/status";

    @Test
    void checkStatusApplication() throws Exception {
        this.mockMvc
                .perform(get(URL_STATUS))
                .andExpect(status().isOk());
    }
}