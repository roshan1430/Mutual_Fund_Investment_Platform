package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Fund;
import com.example.backend.service.AppService;

@RestController
@RequestMapping("/api/funds")
public class FundController {
    private final AppService appService;

    public FundController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping
    public ResponseEntity<List<Fund>> listFunds() {
        return ResponseEntity.ok(appService.getFunds());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fund> getFund(@PathVariable int id) {
        return ResponseEntity.ok(appService.getFundById(id));
    }
}
