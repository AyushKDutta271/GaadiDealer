package com.MarketConnect.GaadiDealer.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class VehicleDto {



    private String carPlateNo;
    private String carBrand;

    private Long userId;




    private String state;
    private String city;
    private List<String> carImages;
    private Double carPrice;



}
