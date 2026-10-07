package com.contactmanagement.backend.Config;

import com.contactmanagement.backend.entity.Admin;
import com.contactmanagement.backend.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createAdmin(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder
    ) {

        return args -> {

            if (
                    adminRepository
                            .findByUsername("admin")
                            .isEmpty()
            ) {

                Admin admin = new Admin();

                admin.setUsername("admin");

                admin.setPassword(
                        passwordEncoder.encode(
                                "Admin@123"
                        )
                );

                admin.setRole("ADMIN");

                adminRepository.save(admin);

                System.out.println(
                        "Default admin created"
                );
            }
        };
    }
}

