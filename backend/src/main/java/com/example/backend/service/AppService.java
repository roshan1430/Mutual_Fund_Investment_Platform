package com.example.backend.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.entity.FundEntity;
import com.example.backend.entity.FundsHoldingEntity;
import com.example.backend.entity.ReportEntity;
import com.example.backend.entity.UserEntity;
import com.example.backend.exception.ApiException;
import com.example.backend.model.AuthResponse;
import com.example.backend.model.DashboardSummary;
import com.example.backend.model.Fund;
import com.example.backend.model.FundsHolding;
import com.example.backend.model.RegisterRequest;
import com.example.backend.model.Report;
import com.example.backend.model.SellResponse;
import com.example.backend.model.SipRequest;
import com.example.backend.model.SipResponse;
import com.example.backend.model.UserProfile;
import com.example.backend.repository.FundRepository;
import com.example.backend.repository.FundsHoldingRepository;
import com.example.backend.repository.ReportRepository;
import com.example.backend.repository.UserRepository;

@Service
public class AppService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FundRepository fundRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private FundsHoldingRepository fundsHoldingRepository;

    // Fallback in-memory storage for demo purposes
    private final Map<String, String> userPasswords = new ConcurrentHashMap<>();
    private final Map<String, UserProfile> userProfiles = new ConcurrentHashMap<>();
    private volatile boolean dataInitialized = false;

    public AppService() {
    }

    private synchronized void initializeMockDataIfNeeded() {
        if (dataInitialized) return;
        dataInitialized = true;

        try {
            // Initialize mock data in database
            if (userRepository.count() == 0) {
                userRepository.save(new UserEntity("user@example.com", hashPassword("password123"), "Jane Investor"));
                userRepository.save(new UserEntity("demo@example.com", hashPassword("demo1234"), "Demo User"));
            }

            if (fundRepository.count() == 0) {
                fundRepository.save(createFundEntity(1, "Growth Equity Fund", "Large Cap", "₹156.78", "+18.5%", "+14.2%", "+12.8%", "High", true,
                        "₹2.4B", "0.75%", "₹1,000", "Jan 2026", "Rahul Sharma",
                        List.of("HDFC Bank", "Reliance Industries", "Tata Consultancy Services", "Infosys", "ICICI Bank")));
                fundRepository.save(createFundEntity(2, "Balanced Growth Fund", "Hybrid", "₹89.42", "+12.8%", "+11.5%", "+9.0%", "Medium", true,
                        "₹1.2B", "0.85%", "₹500", "Mar 2025", "Priya Kumar",
                        List.of("HDFC Mutual Fund", "Axis Bank", "Adani Enterprises", "L&T", "Maruti Suzuki")));
                fundRepository.save(createFundEntity(3, "Tech Innovation Fund", "Sector", "₹234.56", "+25.3%", "+19.7%", "+16.9%", "High", true,
                        "₹3.1B", "1.05%", "₹2,500", "Jul 2025", "Rohit Singh",
                        List.of("Tata Consultancy Services", "Infosys", "HCL Tech", "Wipro", "Tech Mahindra")));
                fundRepository.save(createFundEntity(4, "Conservative Income Fund", "Debt", "₹45.12", "+6.8%", "+7.2%", "+7.5%", "Low", true,
                        "₹980M", "0.45%", "₹1,000", "Sep 2025", "Smita Joshi",
                        List.of("Government Securities", "AAA Corporate Bonds", "Bank FD", "Money Market Instruments")));
                fundRepository.save(createFundEntity(5, "Blue Chip Equity Fund", "Large Cap", "₹198.45", "+20.5%", "+16.8%", "+14.2%", "High", true,
                        "₹3.8B", "0.65%", "₹1,000", "Feb 2025", "Amit Patel",
                        List.of("Reliance Industries", "ICICI Bank", "HDFC Bank", "Infosys", "Larsen & Toubro")));
                fundRepository.save(createFundEntity(6, "Banking & Financial Fund", "Sector", "₹125.67", "+15.3%", "+13.6%", "+11.4%", "Medium", true,
                        "₹2.1B", "0.80%", "₹2,000", "Apr 2025", "Sneha Sharma",
                        List.of("Axis Bank", "Kotak Mahindra Bank", "Bajaj Finance", "HDFC Ltd", "SBI")));
                fundRepository.save(createFundEntity(7, "Auto & Automobile Fund", "Sector", "₹187.89", "+22.7%", "+18.9%", "+15.6%", "High", true,
                        "₹2.5B", "0.90%", "₹2,500", "Jun 2025", "Rajesh Verma",
                        List.of("Tata Motors", "Mahindra & Mahindra", "Maruti Suzuki", "Ashok Leyland", "Eicher Motors")));
            }

            if (reportRepository.count() == 0) {
                reportRepository.save(new ReportEntity("Monthly Portfolio Statement", "Comprehensive overview of your portfolio performance", "April 2026", "Portfolio", "Ready"));
                reportRepository.save(new ReportEntity("Tax Savings Report", "Annual tax optimization and savings analysis", "FY 2025-26", "Tax", "Ready"));
                reportRepository.save(new ReportEntity("Performance Analytics", "Detailed performance metrics and benchmarking", "Q1 2026", "Analytics", "Processing"));
                reportRepository.save(new ReportEntity("Risk Assessment Report", "Portfolio risk analysis and recommendations", "April 2026", "Risk", "Ready"));
            }

            if (fundsHoldingRepository.count() == 0) {
                fundsHoldingRepository.save(new FundsHoldingEntity(1L, 1L, "Growth Equity Fund", new BigDecimal("50"), new BigDecimal("150"), new BigDecimal("156.78")));
                fundsHoldingRepository.save(new FundsHoldingEntity(1L, 2L, "Balanced Growth Fund", new BigDecimal("100"), new BigDecimal("85"), new BigDecimal("89.42")));
                fundsHoldingRepository.save(new FundsHoldingEntity(1L, 3L, "Tech Innovation Fund", new BigDecimal("20"), new BigDecimal("200"), new BigDecimal("234.56")));
            }
        } catch (Exception e) {
            System.err.println("Failed to initialize database: " + e.getMessage());
            // Fall back to in-memory storage
        }
    }

    public AuthResponse register(RegisterRequest request) {
        initializeMockDataIfNeeded();
        String email = request.getEmail().toLowerCase();

        if (userRepository.findByEmail(email).isPresent()) {
            throw new ApiException("Email is already registered");
        }

        if (request.getPassword().length() < 6) {
            throw new ApiException("Password must be at least 6 characters long");
        }

        UserEntity user = new UserEntity(email, hashPassword(request.getPassword()), request.getName());
        userRepository.save(user);
        return new AuthResponse(true, "Registration successful");
    }

    public AuthResponse login(String email, String password) {
        initializeMockDataIfNeeded();
        String normalizedEmail = email.toLowerCase();
        String hashedPassword = hashPassword(password);

        UserEntity user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new ApiException("Invalid email or password"));

        if (!user.getPassword().equals(hashedPassword)) {
            throw new ApiException("Invalid email or password");
        }

        UserProfile profile = new UserProfile(user.getId(), user.getEmail(), user.getName());
        return new AuthResponse(true, "Login successful", profile);
    }

    public List<Fund> getFunds() {
        initializeMockDataIfNeeded();
        List<FundEntity> entities = fundRepository.findAll();
        List<Fund> funds = new ArrayList<>();
        for (FundEntity entity : entities) {
            funds.add(convertFundEntityToFund(entity));
        }
        return Collections.unmodifiableList(funds);
    }

    public Fund getFundById(int id) {
        initializeMockDataIfNeeded();
        FundEntity entity = fundRepository.findById((long) id)
                .orElseThrow(() -> new ApiException("Fund not found"));
        return convertFundEntityToFund(entity);
    }

    public DashboardSummary getDashboardSummary(Long userId) {
        initializeMockDataIfNeeded();
        List<FundsHoldingEntity> holdings = userId != null ?
            fundsHoldingRepository.findByUserId(userId) :
            fundsHoldingRepository.findAll();
        List<FundEntity> funds = fundRepository.findAll();

        BigDecimal totalPortfolio = holdings.stream()
            .map(FundsHoldingEntity::getCurrentValue)
            .filter(value -> value != null)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalInvested = holdings.stream()
            .map(FundsHoldingEntity::getTotalInvested)
            .filter(value -> value != null)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        int activeFunds = (int) holdings.stream()
            .map(FundsHoldingEntity::getFundId)
            .distinct()
            .count();

        int newFundsThisMonth = (int) holdings.stream()
            .map(FundsHoldingEntity::getFundId)
            .distinct()
            .filter(fundId -> funds.stream()
                .filter(fund -> fund.getId() != null && fund.getId().equals(fundId))
                .anyMatch(fund -> isLaunchInCurrentMonth(fund.getLaunchDate())))
            .count();

        double monthlyReturn = totalInvested.compareTo(BigDecimal.ZERO) > 0
            ? totalPortfolio.subtract(totalInvested).divide(totalInvested, 4, RoundingMode.HALF_UP).multiply(new BigDecimal(100)).doubleValue()
            : 0.0;

        double returnChange = monthlyReturn * 0.18;
        double riskScore = calculateRiskScore(holdings, funds);
        String riskLevel = describeRiskLevel(riskScore);

        DashboardSummary summary = new DashboardSummary();
        summary.setTotalPortfolio(totalPortfolio.doubleValue());
        summary.setActiveFunds(activeFunds);
        summary.setNewFundsThisMonth(newFundsThisMonth);
        summary.setMonthlyReturn(roundValue(monthlyReturn));
        summary.setReturnChange(roundValue(returnChange));
        summary.setRiskScore(roundValue(riskScore));
        summary.setRiskLevel(riskLevel);

        List<DashboardSummary.Transaction> transactions = holdings.stream()
            .sorted(Comparator.comparing(
                holding -> holding.getUpdatedAt() != null ? holding.getUpdatedAt() : holding.getCreatedAt(),
                Comparator.nullsLast(Comparator.reverseOrder())
            ))
            .limit(4)
            .map(holding -> {
                DashboardSummary.Transaction txn = new DashboardSummary.Transaction();
                txn.setFundName(holding.getFundName());

                BigDecimal changeValue = holding.getCurrentValue().subtract(holding.getTotalInvested());
                txn.setType(changeValue.compareTo(BigDecimal.ZERO) >= 0 ? "Gain" : "Loss");
                txn.setAmount(changeValue.abs().doubleValue());
                txn.setDate(formatRelativeDate(
                    holding.getUpdatedAt() != null ? holding.getUpdatedAt() : holding.getCreatedAt()
                ));
                return txn;
            })
            .collect(Collectors.toList());

        summary.setRecentTransactions(transactions);
        return summary;
    }

    private boolean isLaunchInCurrentMonth(String launchDate) {
        if (launchDate == null || launchDate.isBlank()) {
            return false;
        }

        try {
            String[] parts = launchDate.split(" ");
            if (parts.length < 2) {
                return false;
            }

            Month month = Month.valueOf(parts[0].toUpperCase(Locale.ENGLISH));
            int year = Integer.parseInt(parts[1]);
            LocalDateTime now = LocalDateTime.now();
            return month == now.getMonth() && year == now.getYear();
        } catch (Exception e) {
            return false;
        }
    }

    private double calculateRiskScore(List<FundsHoldingEntity> holdings, List<FundEntity> funds) {
        if (holdings.isEmpty() || funds.isEmpty()) {
            return 0.0;
        }

        BigDecimal totalValue = holdings.stream()
            .map(FundsHoldingEntity::getCurrentValue)
            .filter(value -> value != null)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (totalValue.compareTo(BigDecimal.ZERO) == 0) {
            return 5.0;
        }

        Map<Long, String> fundRiskById = funds.stream()
            .filter(fund -> fund.getId() != null)
            .collect(Collectors.toMap(FundEntity::getId, FundEntity::getRisk, (first, second) -> first));

        BigDecimal weightedRisk = holdings.stream()
            .map(holding -> {
                String riskLabel = fundRiskById.getOrDefault(holding.getFundId(), "Moderate").trim();
                double riskWeight;
                if (riskLabel.equals("Low")) {
                    riskWeight = 2.0;
                } else if (riskLabel.equals("High")) {
                    riskWeight = 7.5;
                } else if (riskLabel.equals("Very High")) {
                    riskWeight = 9.0;
                } else {
                    riskWeight = 5.0;
                }
                return new BigDecimal(riskWeight).multiply(holding.getCurrentValue());
            })
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        return weightedRisk.divide(totalValue, 2, RoundingMode.HALF_UP).doubleValue();
    }

    private String describeRiskLevel(double score) {
        if (score <= 0.0) {
            return "No Risk";
        }
        if (score < 4.0) {
            return "Low Risk";
        }
        if (score < 6.5) {
            return "Moderate Risk";
        }
        if (score < 8.0) {
            return "High Risk";
        }
        return "Very High Risk";
    }

    private String formatRelativeDate(LocalDateTime dateTime) {
        if (dateTime == null) {
            return "Today";
        }

        LocalDateTime now = LocalDateTime.now();
        long days = java.time.Duration.between(dateTime, now).toDays();
        if (days == 0) {
            return "Today";
        }
        if (days == 1) {
            return "Yesterday";
        }
        return days + " days ago";
    }

    private double roundValue(double value) {
        return new BigDecimal(value).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }

    public List<Report> getReports() {
        initializeMockDataIfNeeded();
        List<ReportEntity> entities = reportRepository.findAll();
        List<Report> reports = new ArrayList<>();
        for (ReportEntity entity : entities) {
            Report report = new Report();
            report.setId(entity.getId().intValue());
            report.setTitle(entity.getTitle());
            report.setDescription(entity.getDescription());
            report.setDate(entity.getDate());
            report.setType(entity.getType());
            report.setStatus(entity.getStatus());
            reports.add(report);
        }
        return Collections.unmodifiableList(reports);
    }

    public byte[] downloadReport(int id) {
        initializeMockDataIfNeeded();
        ReportEntity report = reportRepository.findById((long) id)
                .orElseThrow(() -> new ApiException("Report not found"));

        if (!"Ready".equalsIgnoreCase(report.getStatus())) {
            throw new ApiException("Report is not ready for download yet");
        }

        String pdfContent = "Report: " + report.getTitle() + "\n\n" + report.getDescription() + "\n\nDate: " + report.getDate();
        return pdfContent.getBytes(StandardCharsets.UTF_8);
    }

    public SipResponse calculateSip(SipRequest request) {
        double monthlyInvestment = request.getMonthlyInvestment();
        double expectedReturn = request.getExpectedReturn();
        int timePeriod = request.getTimePeriod();

        double monthlyRate = expectedReturn / 100.0 / 12.0;
        int months = timePeriod * 12;
        double totalInvestment = monthlyInvestment * months;
        double maturityValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        double estimatedReturns = maturityValue - totalInvestment;

        return new SipResponse(totalInvestment, estimatedReturns, maturityValue);
    }

    private FundEntity createFundEntity(int id, String name, String category, String nav, String return1y, String return3y, String return5y,
                                        String risk, boolean isPositive, String aum, String expenseRatio, String minInvestment, String launchDate,
                                        String manager, List<String> topHoldings) {
        FundEntity fund = new FundEntity();
        fund.setName(name);
        fund.setCategory(category);
        fund.setNav(nav);
        fund.setReturn1y(return1y);
        fund.setReturn3y(return3y);
        fund.setReturn5y(return5y);
        fund.setRisk(risk);
        fund.setPositive(isPositive);
        fund.setAum(aum);
        fund.setExpenseRatio(expenseRatio);
        fund.setMinInvestment(minInvestment);
        fund.setLaunchDate(launchDate);
        fund.setManager(manager);
        fund.setDescription("This fund invests in a diversified mix of high-quality assets to help you achieve long-term growth.");
        fund.setTopHoldings(topHoldings);
        return fund;
    }

    private Fund convertFundEntityToFund(FundEntity entity) {
        Fund fund = new Fund();
        fund.setId(entity.getId().intValue());
        fund.setName(entity.getName());
        fund.setCategory(entity.getCategory());
        fund.setNav(entity.getNav());
        fund.setReturn1y(entity.getReturn1y());
        fund.setReturn3y(entity.getReturn3y());
        fund.setReturn5y(entity.getReturn5y());
        fund.setRisk(entity.getRisk());
        fund.setPositive(entity.isPositive());
        fund.setAum(entity.getAum());
        fund.setExpenseRatio(entity.getExpenseRatio());
        fund.setMinInvestment(entity.getMinInvestment());
        fund.setLaunchDate(entity.getLaunchDate());
        fund.setManager(entity.getManager());
        fund.setDescription(entity.getDescription());
        fund.setTopHoldings(entity.getTopHoldings());
        return fund;
    }

    private String hashPassword(String rawPassword) {
        return Base64.getEncoder().encodeToString(rawPassword.getBytes(StandardCharsets.UTF_8));
    }

    public List<FundsHolding> getFundsHoldings(Long userId) {
        List<FundsHoldingEntity> entities = fundsHoldingRepository.findByUserId(userId);
        List<FundsHolding> holdings = new ArrayList<>();
        for (FundsHoldingEntity entity : entities) {
            holdings.add(convertFundsHoldingEntityToModel(entity));
        }
        return holdings;
    }

    public FundsHolding addFundsHolding(FundsHolding holding) {
        if (holding.getUnits() == null || holding.getAverageBuyPrice() == null) {
            throw new ApiException("Units and average buy price are required to add a holding");
        }

        if (holding.getCurrentPrice() == null) {
            holding.setCurrentPrice(holding.getAverageBuyPrice());
        }

        if (holding.getTotalInvested() == null) {
            holding.setTotalInvested(holding.getAverageBuyPrice().multiply(holding.getUnits()));
        }

        if (holding.getCurrentValue() == null) {
            holding.setCurrentValue(holding.getCurrentPrice().multiply(holding.getUnits()));
        }

        if (holding.getReturns() == null) {
            holding.setReturns(holding.getCurrentValue().subtract(holding.getTotalInvested()));
        }

        if (holding.getReturnsPercentage() == null) {
            holding.setReturnsPercentage(
                holding.getTotalInvested().compareTo(BigDecimal.ZERO) > 0
                    ? holding.getReturns().divide(holding.getTotalInvested(), 2, java.math.RoundingMode.HALF_UP).multiply(new BigDecimal(100))
                    : BigDecimal.ZERO
            );
        }

        // Check if user already has a holding for this fund
        var existingHolding = fundsHoldingRepository.findByUserIdAndFundId(holding.getUserId(), holding.getFundId());
        
        if (existingHolding.isPresent()) {
            // Merge with existing holding
            FundsHoldingEntity existing = existingHolding.get();
            BigDecimal incomingUnits = holding.getUnits();
            BigDecimal incomingTotalInvested = holding.getTotalInvested();
            BigDecimal incomingCurrentPrice = holding.getCurrentPrice();
            
            BigDecimal newUnits = existing.getUnits().add(incomingUnits);
            BigDecimal newTotalInvested = existing.getTotalInvested().add(incomingTotalInvested);
            BigDecimal newAverageBuyPrice = newTotalInvested.divide(newUnits, 2, java.math.RoundingMode.HALF_UP);
            BigDecimal newCurrentValue = newUnits.multiply(incomingCurrentPrice);
            BigDecimal newReturns = newCurrentValue.subtract(newTotalInvested);
            BigDecimal newReturnsPercentage = newTotalInvested.compareTo(BigDecimal.ZERO) > 0 ? 
                newReturns.divide(newTotalInvested, 2, java.math.RoundingMode.HALF_UP).multiply(new BigDecimal(100)) : 
                BigDecimal.ZERO;
            
            existing.setUnits(newUnits);
            existing.setAverageBuyPrice(newAverageBuyPrice);
            existing.setCurrentPrice(incomingCurrentPrice);
            existing.setTotalInvested(newTotalInvested);
            existing.setCurrentValue(newCurrentValue);
            existing.setReturns(newReturns);
            existing.setReturnsPercentage(newReturnsPercentage);
            
            FundsHoldingEntity saved = fundsHoldingRepository.save(existing);
            return convertFundsHoldingEntityToModel(saved);
        } else {
            // Create new holding
            FundsHoldingEntity entity = new FundsHoldingEntity(
                holding.getUserId(),
                holding.getFundId(),
                holding.getFundName(),
                holding.getUnits(),
                holding.getAverageBuyPrice(),
                holding.getCurrentPrice()
            );
            FundsHoldingEntity saved = fundsHoldingRepository.save(entity);
            return convertFundsHoldingEntityToModel(saved);
        }
    }

    public SellResponse sellFundsHolding(Long userId, Long fundId, BigDecimal unitsToSell, BigDecimal currentPrice) {
        var holdingOptional = fundsHoldingRepository.findByUserIdAndFundId(userId, fundId);
        
        if (holdingOptional.isEmpty()) {
            throw new ApiException("No holding found for this fund");
        }
        
        FundsHoldingEntity holding = holdingOptional.get();
        
        if (holding.getUnits().compareTo(unitsToSell) < 0) {
            throw new ApiException("Cannot sell more units than you own. Available: " + holding.getUnits());
        }
        
        // Calculate sale amount
        BigDecimal saleValue = unitsToSell.multiply(currentPrice);
        
        // Calculate gain/loss
        BigDecimal costPrice = holding.getAverageBuyPrice().multiply(unitsToSell);
        BigDecimal gainLoss = saleValue.subtract(costPrice);
        BigDecimal gainLossPercentage = costPrice.compareTo(BigDecimal.ZERO) > 0 ? 
            gainLoss.divide(costPrice, 4, java.math.RoundingMode.HALF_UP).multiply(new BigDecimal(100)) : 
            BigDecimal.ZERO;
        
        // Update or delete holding
        BigDecimal remainingUnits = holding.getUnits().subtract(unitsToSell);
        
        if (remainingUnits.compareTo(BigDecimal.ZERO) <= 0) {
            // Delete the holding if no units left
            fundsHoldingRepository.deleteById(holding.getId());
        } else {
            // Update the holding with remaining units
            BigDecimal newTotalInvested = holding.getAverageBuyPrice().multiply(remainingUnits);
            BigDecimal newCurrentValue = remainingUnits.multiply(currentPrice);
            BigDecimal newReturns = newCurrentValue.subtract(newTotalInvested);
            BigDecimal newReturnsPercentage = newTotalInvested.compareTo(BigDecimal.ZERO) > 0 ? 
                newReturns.divide(newTotalInvested, 2, java.math.RoundingMode.HALF_UP).multiply(new BigDecimal(100)) : 
                BigDecimal.ZERO;
            
            holding.setUnits(remainingUnits);
            holding.setTotalInvested(newTotalInvested);
            holding.setCurrentValue(newCurrentValue);
            holding.setCurrentPrice(currentPrice);
            holding.setReturns(newReturns);
            holding.setReturnsPercentage(newReturnsPercentage);
            
            fundsHoldingRepository.save(holding);
        }
        
        return new SellResponse(holding.getFundName(), unitsToSell, saleValue, gainLoss, gainLossPercentage);
    }

    private FundsHolding convertFundsHoldingEntityToModel(FundsHoldingEntity entity) {
        FundsHolding holding = new FundsHolding();
        holding.setId(entity.getId());
        holding.setUserId(entity.getUserId());
        holding.setFundId(entity.getFundId());
        holding.setFundName(entity.getFundName());
        holding.setUnits(entity.getUnits());
        holding.setAverageBuyPrice(entity.getAverageBuyPrice());
        holding.setCurrentPrice(entity.getCurrentPrice());
        holding.setTotalInvested(entity.getTotalInvested());
        holding.setCurrentValue(entity.getCurrentValue());
        holding.setReturns(entity.getReturns());
        holding.setReturnsPercentage(entity.getReturnsPercentage());
        return holding;
    }
}
