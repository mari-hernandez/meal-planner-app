package com.api.Backend.auth;

import com.api.Backend.auth.dto.AuthResponse;
import com.api.Backend.auth.dto.LoginRequest;
import com.api.Backend.auth.dto.RegisterRequest;
import com.api.Backend.core.models.UserModel;
import com.api.Backend.core.repositories.IUserRepository;
import com.api.Backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private IUserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserDetails user=userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token=jwtService.generateToken(user);
        return AuthResponse.builder()
                .success(true)
                .token(token)
                .build();
    }

    public AuthResponse saveUser(RegisterRequest request) {
        String validMsg = validateUser(request);

        if (!validMsg.equals("Valid")) {
            return AuthResponse.builder()
                    .error(validMsg)
                    .success(false)
                    .build();
        }

        UserModel user = UserModel.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode( request.getPassword()))
                .build();

        userRepository.save(user);

        return AuthResponse.builder()
                .token(jwtService.generateToken(user))
                .success(true)
                .build();
    }

    private String validateUser(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Username already exists";
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }
        return "Valid";
    }


}
