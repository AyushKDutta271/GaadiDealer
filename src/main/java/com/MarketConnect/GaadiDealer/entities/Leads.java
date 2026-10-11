package com.MarketConnect.GaadiDealer.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor
@NoArgsConstructor
public class Leads {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Vehicle carId;
    private Status buy;
    private String uploadedDoc;
    private Boolean isVerified;
    private Boolean isPaymentDone;

    @CreatedDate
    @Column(nullable = false,updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime modifiedAt;

    public Leads(User userId, Vehicle carId, Status buy, String uploadedDoc, Boolean isVerified, Boolean isPaymentDone) {
        this.userId = userId;
        this.carId = carId;
        this.buy = buy;
        this.uploadedDoc = uploadedDoc;
        this.isVerified = isVerified;
        this.isPaymentDone = isPaymentDone;
    }
}
