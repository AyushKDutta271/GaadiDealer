package com.MarketConnect.GaadiDealer.dtos;



import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class TestDriveDto {

    private Long userId;
    private LocalDateTime dateAndTimeOfTestDrive;
    private Long carId;
    private String city;
    private Boolean isDone;
}
