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

@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String fullName;
    private String emailId;
    private String password;
    private String confirmPassword;
    @OneToOne(mappedBy = "carOwner")
    private Vehicle carId;

    @OneToMany(mappedBy = "userId")
    private TestDrive testDriveId;


    @OneToOne(mappedBy = "userId")
    private Leads leadId;
    private String userState;
    private String userCity;
    private UserType userType;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime modifiedAt;

    public User(String fullName, String emailId, String password, String confirmPassword, String userState, String userCity, UserType userType) {
        this.fullName = fullName;
        this.emailId = emailId;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.userState = userState;
        this.userCity = userCity;
        this.userType = userType;

    }
}
