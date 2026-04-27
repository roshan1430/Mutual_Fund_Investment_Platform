package com.example.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.example.backend.exception.ApiException;

@Service
public class MailService {
    private static final Logger logger = LoggerFactory.getLogger(MailService.class);

    private final JavaMailSender mailSender;
    private final String fromAddress;
    private final String configuredUsername;

    public MailService(
            JavaMailSender mailSender,
            @Value("${app.mail.from:no-reply@mutualfundspro.local}") String fromAddress,
            @Value("${spring.mail.username:}") String configuredUsername) {
        this.mailSender = mailSender;
        this.fromAddress = fromAddress;
        this.configuredUsername = configuredUsername;
    }

    public void sendVerificationCode(String recipient, String name, String code) {
        requireMailConfigured("Verification code", recipient, code);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(recipient);
        message.setSubject("Verify your MutualFunds Pro account");
        message.setText(buildVerificationBody(name, code));
        mailSender.send(message);
    }

    public void sendLoginOtp(String recipient, String name, String code) {
        requireMailConfigured("Login OTP", recipient, code);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(recipient);
        message.setSubject("Your MutualFunds Pro login OTP");
        message.setText("Hi " + name + ",\n\nYour login OTP is: " + code + "\n\nThis OTP expires in 10 minutes.\n");
        mailSender.send(message);
    }

    public void sendPasswordResetOtp(String recipient, String name, String code) {
        requireMailConfigured("Password reset OTP", recipient, code);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(recipient);
        message.setSubject("Reset your MutualFunds Pro password");
        message.setText("Hi " + name + ",\n\nYour password reset OTP is: " + code + "\n\nThis OTP expires in 10 minutes.\n");
        mailSender.send(message);
    }

    private String buildVerificationBody(String name, String code) {
        return "Hi " + name + ",\n\n"
            + "Your MutualFunds Pro verification code is: " + code + "\n\n"
            + "This code expires in 10 minutes.\n\n"
            + "If you did not request this, please ignore this email.\n";
    }

    private void requireMailConfigured(String mailType, String recipient, String code) {
        if (StringUtils.hasText(configuredUsername)) {
            return;
        }

        logger.warn("Mail sender is not configured. {} for {} is {}", mailType, recipient, code);
        throw new ApiException("Email sending is not configured. Set SPRING_MAIL_HOST, SPRING_MAIL_USERNAME, and SPRING_MAIL_PASSWORD first.");
    }
}
