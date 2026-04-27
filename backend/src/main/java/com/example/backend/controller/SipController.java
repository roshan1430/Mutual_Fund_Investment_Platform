package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.SipRequest;
import com.example.backend.model.SipResponse;
import com.example.backend.service.AppService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/sip")
public class SipController {
    private final AppService appService;

    public SipController(AppService appService) {
        this.appService = appService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<SipResponse> calculate(@Valid @RequestBody SipRequest request) {
        return ResponseEntity.ok(appService.calculateSip(request));
    }
}
