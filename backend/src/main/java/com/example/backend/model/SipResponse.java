package com.example.backend.model;

public class SipResponse {
    private double totalInvestment;
    private double estimatedReturns;
    private double maturityValue;

    public SipResponse() {}

    public SipResponse(double totalInvestment, double estimatedReturns, double maturityValue) {
        this.totalInvestment = totalInvestment;
        this.estimatedReturns = estimatedReturns;
        this.maturityValue = maturityValue;
    }

    public double getTotalInvestment() { return totalInvestment; }
    public void setTotalInvestment(double totalInvestment) { this.totalInvestment = totalInvestment; }
    public double getEstimatedReturns() { return estimatedReturns; }
    public void setEstimatedReturns(double estimatedReturns) { this.estimatedReturns = estimatedReturns; }
    public double getMaturityValue() { return maturityValue; }
    public void setMaturityValue(double maturityValue) { this.maturityValue = maturityValue; }
}
