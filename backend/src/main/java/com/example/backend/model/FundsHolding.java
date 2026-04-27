package com.example.backend.model;

import java.math.BigDecimal;

public class FundsHolding {
    private Long id;
    private Long userId;
    private Long fundId;
    private String fundName;
    private BigDecimal units;
    private BigDecimal averageBuyPrice;
    private BigDecimal currentPrice;
    private BigDecimal totalInvested;
    private BigDecimal currentValue;
    private BigDecimal returns;
    private BigDecimal returnsPercentage;

    public FundsHolding() {
    }

    public FundsHolding(Long userId, Long fundId, String fundName, BigDecimal units, 
                       BigDecimal averageBuyPrice, BigDecimal currentPrice) {
        this.userId = userId;
        this.fundId = fundId;
        this.fundName = fundName;
        this.units = units;
        this.averageBuyPrice = averageBuyPrice;
        this.currentPrice = currentPrice;
        this.totalInvested = averageBuyPrice.multiply(units);
        this.currentValue = currentPrice.multiply(units);
        this.returns = this.currentValue.subtract(this.totalInvested);
        this.returnsPercentage = this.returns.divide(this.totalInvested, 2, java.math.RoundingMode.HALF_UP).multiply(new BigDecimal(100));
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getFundName() {
        return fundName;
    }

    public void setFundName(String fundName) {
        this.fundName = fundName;
    }

    public BigDecimal getUnits() {
        return units;
    }

    public void setUnits(BigDecimal units) {
        this.units = units;
    }

    public BigDecimal getAverageBuyPrice() {
        return averageBuyPrice;
    }

    public void setAverageBuyPrice(BigDecimal averageBuyPrice) {
        this.averageBuyPrice = averageBuyPrice;
    }

    public BigDecimal getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(BigDecimal currentPrice) {
        this.currentPrice = currentPrice;
    }

    public BigDecimal getTotalInvested() {
        return totalInvested;
    }

    public void setTotalInvested(BigDecimal totalInvested) {
        this.totalInvested = totalInvested;
    }

    public BigDecimal getCurrentValue() {
        return currentValue;
    }

    public void setCurrentValue(BigDecimal currentValue) {
        this.currentValue = currentValue;
    }

    public BigDecimal getReturns() {
        return returns;
    }

    public void setReturns(BigDecimal returns) {
        this.returns = returns;
    }

    public BigDecimal getReturnsPercentage() {
        return returnsPercentage;
    }

    public void setReturnsPercentage(BigDecimal returnsPercentage) {
        this.returnsPercentage = returnsPercentage;
    }
}
