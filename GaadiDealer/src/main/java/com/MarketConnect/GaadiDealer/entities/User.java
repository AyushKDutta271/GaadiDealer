package com.MarketConnect.GaadiDealer.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)

@NoArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    private String fullName;


    private String emailId;



    private String password;


    @Transient
    private String confirmPassword;

    @ToString.Exclude
    @OneToOne(mappedBy = "carOwner")
    private Vehicle carId;

    @OneToMany(mappedBy = "userId")
    private List<TestDrive> testDriveId;


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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority("ROLE_"+userType.toString().toUpperCase()));
        return authorities;
    }

    @Override
    public String getUsername() {
        return emailId;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", emailId='" + emailId + '\'' +
                ", password='" + password + '\'' +
                ", confirmPassword='" + confirmPassword + '\'' +
                ", carId=" + carId +
                ", testDriveId=" + testDriveId +
                ", leadId=" + leadId +
                ", userState='" + userState + '\'' +
                ", userCity='" + userCity + '\'' +
                ", userType=" + userType +
                ", createdAt=" + createdAt +
                ", modifiedAt=" + modifiedAt +
                '}';
    }
}
