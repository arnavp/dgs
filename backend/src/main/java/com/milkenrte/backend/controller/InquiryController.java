package com.milkenrte.backend.controller;

import com.milkenrte.backend.model.Inquiry;
import com.milkenrte.backend.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
@CrossOrigin(origins = "*")
public class InquiryController {

    private final InquiryRepository inquiryRepository;

    @Autowired
    public InquiryController(InquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    @PostMapping
    public ResponseEntity<?> createInquiry(@RequestBody Inquiry inquiry) {
        if (inquiry.getName() == null || inquiry.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Name is required");
        }
        if (inquiry.getPhone() == null || inquiry.getPhone().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Phone is required");
        }
        if (inquiry.getEmail() == null || inquiry.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }

        Inquiry savedInquiry = inquiryRepository.save(inquiry);
        return new ResponseEntity<>(savedInquiry, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Inquiry>> getAllInquiries() {
        List<Inquiry> inquiries = inquiryRepository.findAll();
        return ResponseEntity.ok(inquiries);
    }
}
