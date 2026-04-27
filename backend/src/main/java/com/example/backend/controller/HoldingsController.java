package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.FundsHolding;
import com.example.backend.model.SellRequest;
import com.example.backend.model.SellResponse;
import com.example.backend.service.AppService;

@RestController
@RequestMapping("/api/holdings")
public class HoldingsController {
    private final AppService appService;

    public HoldingsController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FundsHolding>> getUserHoldings(@PathVariable Long userId) {
        return ResponseEntity.ok(appService.getFundsHoldings(userId));
    }

    @PostMapping
    public ResponseEntity<FundsHolding> addHolding(@RequestBody FundsHolding holding) {
        return ResponseEntity.ok(appService.addFundsHolding(holding));
    }

    @PostMapping("/sell")
    public ResponseEntity<SellResponse> sellHolding(@RequestBody SellRequest request) {
        SellResponse response = appService.sellFundsHolding(
            request.getUserId(),
            request.getFundId(),
            request.getUnits(),
            request.getCurrentPrice()
        );
        return ResponseEntity.ok(response);
    }
}
