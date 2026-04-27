package com.example.backend.model;

import java.math.BigDecimal;

public class SellResponse {
    private String fundName;
    private BigDecimal unitsSold;
    private BigDecimal saleValue;
    private BigDecimal gainLoss;
    private BigDecimal gainLossPercentage;
    private String message;

    // Constructors
    public SellResponse() {}

    public SellResponse(String fundName, BigDecimal unitsSold, BigDecimal saleValue, BigDecimal gainLoss, BigDecimal gainLossPercentage) {
        this.fundName = fundName;
        this.unitsSold = unitsSold;
        this.saleValue = saleValue;
        this.gainLoss = gainLoss;
        this.gainLossPercentage = gainLossPercentage;
        this.message = "Successfully sold " + unitsSold + " units of " + fundName;
    }

    // Getters and Setters
    public String getFundName() {
        return fundName;
    }

    public void setFundName(String fundName) {
        this.fundName = fundName;
    }

    public BigDecimal getUnitsSold() {
        return unitsSold;
    }

    public void setUnitsSold(BigDecimal unitsSold) {
        this.unitsSold = unitsSold;
    }

    public BigDecimal getSaleValue() {
        return saleValue;
    }

    public void setSaleValue(BigDecimal saleValue) {
        this.saleValue = saleValue;
    }

    public BigDecimal getGainLoss() {
        return gainLoss;
    }

    public void setGainLoss(BigDecimal gainLoss) {
        this.gainLoss = gainLoss;
    }

    public BigDecimal getGainLossPercentage() {
        return gainLossPercentage;
    }

    public void setGainLossPercentage(BigDecimal gainLossPercentage) {
        this.gainLossPercentage = gainLossPercentage;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
