package com.MarketConnect.GaadiDealer.dtos;



import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class TestDriveDto {

    private Long id;
    @NotNull
    private Long userId;

    @NotNull
    private LocalDateTime dateAndTimeOfTestDrive;

    @NotNull
    private Long carId;

    @NotNull
    private String city;

    @NotNull
    private Boolean isDone;
}
