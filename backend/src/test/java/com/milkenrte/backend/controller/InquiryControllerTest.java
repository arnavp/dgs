package com.milkenrte.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.milkenrte.backend.model.Inquiry;
import com.milkenrte.backend.repository.InquiryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(InquiryController.class)
public class InquiryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private InquiryRepository inquiryRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Inquiry validInquiry;

    @BeforeEach
    void setUp() {
        validInquiry = Inquiry.builder()
                .id(1L)
                .name("John Doe")
                .phone("9930029900")
                .email("john@example.com")
                .product("Milk")
                .brand("Amul")
                .quantity("Minimum 12 Ltr/10kg")
                .message("Looking for daily supply")
                .build();
    }

    @Test
    void createInquiry_withValidData_shouldReturnCreatedStatus() throws Exception {
        Mockito.when(inquiryRepository.save(any(Inquiry.class))).thenReturn(validInquiry);

        mockMvc.perform(post("/api/inquiries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validInquiry)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("John Doe"))
                .andExpect(jsonPath("$.phone").value("9930029900"))
                .andExpect(jsonPath("$.email").value("john@example.com"));
    }

    @Test
    void createInquiry_withEmptyName_shouldReturnBadRequest() throws Exception {
        Inquiry invalidInquiry = Inquiry.builder()
                .phone("9930029900")
                .email("john@example.com")
                .build();

        mockMvc.perform(post("/api/inquiries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidInquiry)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Name is required"));
    }

    @Test
    void getAllInquiries_shouldReturnInquiryList() throws Exception {
        Mockito.when(inquiryRepository.findAll()).thenReturn(List.of(validInquiry));

        mockMvc.perform(get("/api/inquiries"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("John Doe"));
    }
}
