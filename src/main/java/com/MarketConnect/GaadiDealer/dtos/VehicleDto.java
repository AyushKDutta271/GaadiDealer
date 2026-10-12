package com.MarketConnect.GaadiDealer.dtos;


import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleDto {


    private Long id;

    @NotNull
    @Column(unique = true)
    private String carPlateNo;

    @NotNull
    private String carBrand;

    @NotNull
    private Long userId;




    @NotNull
    private String state;

    @NotNull
    private String city;

    @NotNull
    private List<String> carImages;

    @NotNull
    private Double carPrice;



}
