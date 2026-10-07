package com.contactmanagement.backend.repository;
import com.contactmanagement.backend.entity.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnquiryRepository
        extends JpaRepository<Enquiry, Long> {
}
