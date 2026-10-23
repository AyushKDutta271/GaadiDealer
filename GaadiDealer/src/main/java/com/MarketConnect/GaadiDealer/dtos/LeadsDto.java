package com.MarketConnect.GaadiDealer.dtos;

import com.MarketConnect.GaadiDealer.entities.Status;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LeadsDto {

    private Long id;

    @NotNull
    private Long userId;

    @NotNull
    private Long carId;

    @NotNull
    private Status buy;

    @NotNull
    private String uploadedDoc;

    @NotNull
    private Boolean isVerified;

    @NotNull
    private Boolean isPaymentDone;
}
