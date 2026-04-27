package com.example.backend.model;

import java.math.BigDecimal;

public class SellRequest {
    private Long userId;
    private Long fundId;
    private BigDecimal units;
    private BigDecimal currentPrice;

    // Constructors
    public SellRequest() {}

    public SellRequest(Long userId, Long fundId, BigDecimal units, BigDecimal currentPrice) {
        this.userId = userId;
        this.fundId = fundId;
        this.units = units;
        this.currentPrice = currentPrice;
    }

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getFundId() {
        return fundId;
    }

    public void setFundId(Long fundId) {
        this.fundId = fundId;
    }

    public BigDecimal getUnits() {
        return units;
    }

    public void setUnits(BigDecimal units) {
        this.units = units;
    }

    public BigDecimal getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(BigDecimal currentPrice) {
        this.currentPrice = currentPrice;
    }
}
