package com.example.backend.model;

import java.util.List;

public class DashboardSummary {
    private double totalPortfolio;
    private int activeFunds;
    private int newFundsThisMonth;
    private double monthlyReturn;
    private double returnChange;
    private double riskScore;
    private String riskLevel;
    private List<Transaction> recentTransactions;

    public static class Transaction {
        private String fundName;
        private String type;
        private double amount;
        private String date;

        public String getFundName() { return fundName; }
        public void setFundName(String fundName) { this.fundName = fundName; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public double getAmount() { return amount; }
        public void setAmount(double amount) { this.amount = amount; }
        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
    }

    public double getTotalPortfolio() { return totalPortfolio; }
    public void setTotalPortfolio(double totalPortfolio) { this.totalPortfolio = totalPortfolio; }
    public int getActiveFunds() { return activeFunds; }
    public void setActiveFunds(int activeFunds) { this.activeFunds = activeFunds; }
    public int getNewFundsThisMonth() { return newFundsThisMonth; }
    public void setNewFundsThisMonth(int newFundsThisMonth) { this.newFundsThisMonth = newFundsThisMonth; }
    public double getMonthlyReturn() { return monthlyReturn; }
    public void setMonthlyReturn(double monthlyReturn) { this.monthlyReturn = monthlyReturn; }
    public double getReturnChange() { return returnChange; }
    public void setReturnChange(double returnChange) { this.returnChange = returnChange; }
    public double getRiskScore() { return riskScore; }
    public void setRiskScore(double riskScore) { this.riskScore = riskScore; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public List<Transaction> getRecentTransactions() { return recentTransactions; }
    public void setRecentTransactions(List<Transaction> recentTransactions) { this.recentTransactions = recentTransactions; }
}
