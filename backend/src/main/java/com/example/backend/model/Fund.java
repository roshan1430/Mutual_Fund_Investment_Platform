package com.example.backend.model;

import java.util.List;

public class Fund {
    private int id;
    private String name;
    private String category;
    private String nav;
    private String return1y;
    private String return3y;
    private String return5y;
    private String risk;
    private boolean isPositive;
    private String aum;
    private String expenseRatio;
    private String minInvestment;
    private String launchDate;
    private String manager;
    private String description;
    private List<String> topHoldings;

    public Fund() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getNav() { return nav; }
    public void setNav(String nav) { this.nav = nav; }
    public String getReturn1y() { return return1y; }
    public void setReturn1y(String return1y) { this.return1y = return1y; }
    public String getReturn3y() { return return3y; }
    public void setReturn3y(String return3y) { this.return3y = return3y; }
    public String getReturn5y() { return return5y; }
    public void setReturn5y(String return5y) { this.return5y = return5y; }
    public String getRisk() { return risk; }
    public void setRisk(String risk) { this.risk = risk; }
    public boolean isPositive() { return isPositive; }
    public void setPositive(boolean positive) { isPositive = positive; }
    public String getAum() { return aum; }
    public void setAum(String aum) { this.aum = aum; }
    public String getExpenseRatio() { return expenseRatio; }
    public void setExpenseRatio(String expenseRatio) { this.expenseRatio = expenseRatio; }
    public String getMinInvestment() { return minInvestment; }
    public void setMinInvestment(String minInvestment) { this.minInvestment = minInvestment; }
    public String getLaunchDate() { return launchDate; }
    public void setLaunchDate(String launchDate) { this.launchDate = launchDate; }
    public String getManager() { return manager; }
    public void setManager(String manager) { this.manager = manager; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<String> getTopHoldings() { return topHoldings; }
    public void setTopHoldings(List<String> topHoldings) { this.topHoldings = topHoldings; }
}
