package com.MarketConnect.GaadiDealer.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleDto {



    private String carPlateNo;
    private String carBrand;

    private Long userId;




    private String state;
    private String city;
    private List<String> carImages;
    private Double carPrice;



}
