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
public class TestDrive {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;


    private LocalDateTime dateAndTimeOfTestDrive;

    @ManyToOne
    @JoinColumn(name = "test_car_id")
    private Vehicle testCarId;
    private String city;
    private Boolean isDone;

    @CreatedDate
    @Column(nullable = false,updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime modifiedAt;

    public TestDrive(User userId, LocalDateTime dateAndTimeOfTestDrive, Vehicle testCarId, String city, Boolean isDone) {
        this.userId = userId;
        this.dateAndTimeOfTestDrive = dateAndTimeOfTestDrive;
        this.testCarId = testCarId;
        this.city = city;
        this.isDone = isDone;
    }
}
