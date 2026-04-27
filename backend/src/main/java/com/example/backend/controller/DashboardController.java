package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.DashboardSummary;
import com.example.backend.service.AppService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final AppService appService;

    public DashboardController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping
    public ResponseEntity<DashboardSummary> getSummary(@RequestParam(required = false) Long userId) {
        return ResponseEntity.ok(appService.getDashboardSummary(userId));
    }
}
