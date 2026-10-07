package com.contactmanagement.backend.service;

import com.contactmanagement.backend.dto.EnquiryRequest;
import com.contactmanagement.backend.entity.Enquiry;
import com.contactmanagement.backend.repository.EnquiryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnquiryService {

    private final EnquiryRepository enquiryRepository;

    public EnquiryService(
            EnquiryRepository enquiryRepository) {

        this.enquiryRepository = enquiryRepository;
    }

    public Enquiry createEnquiry(EnquiryRequest request) {

        Enquiry enquiry = Enquiry.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .subject(request.getSubject())
                .message(request.getMessage())
                .status("NEW")
                .build();

        return enquiryRepository.save(enquiry);
    }

    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAll();
    }

    public Enquiry getEnquiry(Long id) {

        return enquiryRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Enquiry not found"
                        )
                );
    }

    public Enquiry updateStatus(
            Long id,
            String status) {

        Enquiry enquiry = getEnquiry(id);

        enquiry.setStatus(status);

        return enquiryRepository.save(enquiry);
    }

    public void deleteEnquiry(Long id) {

        enquiryRepository.deleteById(id);
    }
}
