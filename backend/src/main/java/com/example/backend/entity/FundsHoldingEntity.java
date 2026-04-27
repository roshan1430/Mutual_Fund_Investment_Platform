package com.example.backend.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "funds_holdings", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "fund_id"})
})
public class FundsHoldingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long fundId;

    @Column(nullable = false)
    private String fundName;

    @Column(nullable = false)
    private BigDecimal units;

    @Column(nullable = false)
    private BigDecimal averageBuyPrice;

    @Column(nullable = false)
    private BigDecimal currentPrice;

    @Column(nullable = false)
    private BigDecimal totalInvested;

    @Column(nullable = false)
    private BigDecimal currentValue;

    private BigDecimal returns;

    private BigDecimal returnsPercentage;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public FundsHoldingEntity() {
    }

    public FundsHoldingEntity(Long userId, Long fundId, String fundName, BigDecimal units, 
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
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
