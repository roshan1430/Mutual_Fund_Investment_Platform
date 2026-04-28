package com.example.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.entity.UserEntity;
import com.example.backend.exception.ApiException;
import com.example.backend.model.UserProfile;
import com.example.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;

    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserProfile>> getAllUsers() {
        List<UserProfile> profiles = userRepository.findAll().stream()
            .map(u -> new UserProfile(u.getId(), u.getEmail(), u.getName(), u.getRole(), u.isEmailVerified()))
            .collect(Collectors.toList());
        return ResponseEntity.ok(profiles);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        UserEntity user = userRepository.findById(id)
            .orElseThrow(() -> new ApiException("User not found"));

        if ("ADMIN".equals(user.getRole())) {
            throw new ApiException("Cannot delete an administrator account");
        }

        userRepository.delete(user);
        return ResponseEntity.ok().build();
    }
}
