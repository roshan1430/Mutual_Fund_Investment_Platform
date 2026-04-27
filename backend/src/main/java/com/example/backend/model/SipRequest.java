package com.example.backend.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class SipRequest {
    @NotNull(message = "Monthly investment is required")
    @Min(value = 100, message = "Monthly investment must be at least 100")
    private Double monthlyInvestment;

    @NotNull(message = "Expected return is required")
    @Min(value = 1, message = "Expected return must be at least 1%")
    private Double expectedReturn;

    @NotNull(message = "Time period is required")
    @Min(value = 1, message = "Time period must be at least 1 year")
    private Integer timePeriod;

    public Double getMonthlyInvestment() { return monthlyInvestment; }
    public void setMonthlyInvestment(Double monthlyInvestment) { this.monthlyInvestment = monthlyInvestment; }
    public Double getExpectedReturn() { return expectedReturn; }
    public void setExpectedReturn(Double expectedReturn) { this.expectedReturn = expectedReturn; }
    public Integer getTimePeriod() { return timePeriod; }
    public void setTimePeriod(Integer timePeriod) { this.timePeriod = timePeriod; }
}
