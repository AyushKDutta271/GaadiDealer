package com.MarketConnect.GaadiDealer.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)

@NoArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;



    private String carPlateNo;


    private String carBrand;

    @ToString.Exclude
    @OneToOne
    @JoinColumn(name = "owner_id")
    private User carOwner;


    @OneToMany(mappedBy ="testCarId")
    private List<TestDrive> testDriveId;

    @OneToMany(mappedBy = "carId")
    private List<Leads> leadId;


    private String state;


    private String city;



    @Lob
    @Column(columnDefinition = "LONGTEXT")
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

    @Override
    public String toString() {
        return "Vehicle{" +
                "id=" + id +
                ", carPlateNo='" + carPlateNo + '\'' +
                ", carBrand='" + carBrand + '\'' +
                ", carOwner=" + carOwner +
                ", testDriveId=" + testDriveId +
                ", leadId=" + leadId +
                ", state='" + state + '\'' +
                ", city='" + city + '\'' +
                ", carImages=" + carImages +
                ", carPrice=" + carPrice +
                ", createdAt=" + createdAt +
                ", modifiedAt=" + modifiedAt +
                '}';
    }
}
