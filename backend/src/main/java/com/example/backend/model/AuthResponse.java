package com.example.backend.model;

public class AuthResponse {
    private boolean success;
    private String message;
    private UserProfile user;
    private boolean requiresVerification;
    private String email;
    private String nextStep;

    public AuthResponse() {
    }

    public AuthResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public AuthResponse(boolean success, String message, UserProfile user) {
        this.success = success;
        this.message = message;
        this.user = user;
    }

    public AuthResponse(boolean success, String message, boolean requiresVerification, String email) {
        this.success = success;
        this.message = message;
        this.requiresVerification = requiresVerification;
        this.email = email;
    }

    public AuthResponse(boolean success, String message, boolean requiresVerification, String email, String nextStep) {
        this.success = success;
        this.message = message;
        this.requiresVerification = requiresVerification;
        this.email = email;
        this.nextStep = nextStep;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public UserProfile getUser() {
        return user;
    }

    public void setUser(UserProfile user) {
        this.user = user;
    }

    public boolean isRequiresVerification() {
        return requiresVerification;
    }

    public void setRequiresVerification(boolean requiresVerification) {
        this.requiresVerification = requiresVerification;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNextStep() {
        return nextStep;
    }

    public void setNextStep(String nextStep) {
        this.nextStep = nextStep;
    }
}
