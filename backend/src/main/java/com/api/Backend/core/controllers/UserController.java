package com.api.Backend.core.controllers;

import com.api.Backend.core.dto.HomeResponse;
import com.api.Backend.core.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping
public class UserController {

     @Autowired
     private UserService userService;

    @GetMapping("/home")
    public HomeResponse getHome(HttpServletRequest request) {
        UUID userId = (UUID) request.getAttribute("userId");
        String username = userService.getUsernameById(userId).orElseThrow();

        return HomeResponse.builder()
                .userId(userId.toString())
                .username(username)
                .build();
    }

}
