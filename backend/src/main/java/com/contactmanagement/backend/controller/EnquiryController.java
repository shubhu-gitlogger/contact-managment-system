package com.contactmanagement.backend.controller;
import com.contactmanagement.backend.dto.EnquiryRequest;
import com.contactmanagement.backend.entity.Enquiry;
import com.contactmanagement.backend.service.EnquiryService;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enquiries")
@CrossOrigin(
        origins = {
                "http://localhost:5173"
        }
)
public class EnquiryController {

    private final EnquiryService enquiryService;

    public EnquiryController(
            EnquiryService enquiryService) {

        this.enquiryService = enquiryService;
    }

    @PostMapping
    public ResponseEntity<Enquiry> createEnquiry(
            @Valid @RequestBody EnquiryRequest request) {

        return ResponseEntity.ok(
                enquiryService.createEnquiry(request)
        );
    }

    @GetMapping
    public ResponseEntity<List<Enquiry>> getAllEnquiries() {

        return ResponseEntity.ok(
                enquiryService.getAllEnquiries()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Enquiry> getEnquiry(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                enquiryService.getEnquiry(id)
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Enquiry> updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return ResponseEntity.ok(
                enquiryService.updateStatus(
                        id,
                        status
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEnquiry(
            @PathVariable Long id) {

        enquiryService.deleteEnquiry(id);

        return ResponseEntity.noContent().build();
    }
}
