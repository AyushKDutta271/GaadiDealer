package com.MarketConnect.GaadiDealer.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)

@NoArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String carPlateNo;
    private String carBrand;
    @OneToOne
    @JoinColumn(name = "owner_id")
    private User carOwner;

    @OneToMany(mappedBy ="testCarId")
    private TestDrive testDriveId;

    @OneToMany(mappedBy = "carId")
    private Leads leadId;


    private String state;
    private String city;
    private List<String> carImages;
    private Double carPrice;

    @CreatedDate
    @Column(nullable = false,updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime modifiedAt;

    public Vehicle(String carPlateNo, String carBrand, User carOwner, String state, String city, List<String> carImages, Double carPrice) {
        this.carPlateNo = carPlateNo;
        this.carBrand = carBrand;
        this.carOwner = carOwner;
        this.state = state;
        this.city = city;
        this.carImages = carImages;
        this.carPrice = carPrice;
    }
}
