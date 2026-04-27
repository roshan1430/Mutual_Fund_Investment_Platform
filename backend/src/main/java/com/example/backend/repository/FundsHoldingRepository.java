package com.example.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.FundsHoldingEntity;

@Repository
public interface FundsHoldingRepository extends JpaRepository<FundsHoldingEntity, Long> {
    List<FundsHoldingEntity> findByUserId(Long userId);
    Optional<FundsHoldingEntity> findByUserIdAndFundId(Long userId, Long fundId);
}
