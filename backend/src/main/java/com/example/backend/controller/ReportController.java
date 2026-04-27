package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Report;
import com.example.backend.service.AppService;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final AppService appService;

    public ReportController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping
    public ResponseEntity<List<Report>> getReports() {
        return ResponseEntity.ok(appService.getReports());
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadReport(@PathVariable int id) {
        byte[] content = appService.downloadReport(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment().filename("report-" + id + ".pdf").build());
        return ResponseEntity.ok().headers(headers).body(content);
    }
}
