package com.example.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private boolean emailVerified = false;

    @Column
    private String verificationCode;

    @Column
    private LocalDateTime verificationCodeExpiresAt;

    @Column
    private String loginOtp;

    @Column
    private LocalDateTime loginOtpExpiresAt;

    @Column
    private String passwordResetOtp;

    @Column
    private LocalDateTime passwordResetOtpExpiresAt;

    @Column(nullable = false)
    private String role = "INVESTOR";

    public UserEntity() {}

    public UserEntity(String email, String password, String name, boolean emailVerified) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.emailVerified = emailVerified;
    }

    public UserEntity(String email, String password, String name, boolean emailVerified, String role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.emailVerified = emailVerified;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public LocalDateTime getVerificationCodeExpiresAt() {
        return verificationCodeExpiresAt;
    }

    public void setVerificationCodeExpiresAt(LocalDateTime verificationCodeExpiresAt) {
        this.verificationCodeExpiresAt = verificationCodeExpiresAt;
    }

    public String getLoginOtp() {
        return loginOtp;
    }

    public void setLoginOtp(String loginOtp) {
        this.loginOtp = loginOtp;
    }

    public LocalDateTime getLoginOtpExpiresAt() {
        return loginOtpExpiresAt;
    }

    public void setLoginOtpExpiresAt(LocalDateTime loginOtpExpiresAt) {
        this.loginOtpExpiresAt = loginOtpExpiresAt;
    }

    public String getPasswordResetOtp() {
        return passwordResetOtp;
    }

    public void setPasswordResetOtp(String passwordResetOtp) {
        this.passwordResetOtp = passwordResetOtp;
    }

    public LocalDateTime getPasswordResetOtpExpiresAt() {
        return passwordResetOtpExpiresAt;
    }

    public void setPasswordResetOtpExpiresAt(LocalDateTime passwordResetOtpExpiresAt) {
        this.passwordResetOtpExpiresAt = passwordResetOtpExpiresAt;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
