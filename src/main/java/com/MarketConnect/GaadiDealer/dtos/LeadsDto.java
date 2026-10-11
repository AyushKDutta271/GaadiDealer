package com.MarketConnect.GaadiDealer.dtos;

import com.MarketConnect.GaadiDealer.entities.Status;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LeadsDto {

    private Long userId;
    private Long carId;
    private Status buy;
    private String uploadedDoc;
    private Boolean isVerified;
    private Boolean isPaymentDone;
}
