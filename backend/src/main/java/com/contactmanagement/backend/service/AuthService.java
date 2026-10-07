package com.contactmanagement.backend.service;


import com.contactmanagement.backend.Security.JwtService;
import com.contactmanagement.backend.dto.LoginRequest;
import com.contactmanagement.backend.dto.LoginResponse;
import com.contactmanagement.backend.entity.Admin;
import com.contactmanagement.backend.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {

        Admin admin =
                adminRepository
                        .findByUsername(
                                request.getUsername()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Invalid username or password"
                                )
                        );

        if (!passwordEncoder.matches(
                request.getPassword(),
                admin.getPassword()
        )) {

            throw new RuntimeException(
                    "Invalid username or password"
            );
        }

        String token =
                jwtService.generateToken(
                        admin.getUsername(),
                        admin.getRole()
                );

        return new LoginResponse(
                token,
                admin.getUsername(),
                admin.getRole()
        );
    }
}

