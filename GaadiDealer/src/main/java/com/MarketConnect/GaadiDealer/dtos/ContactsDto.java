package com.MarketConnect.GaadiDealer.dtos;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ContactsDto {

    private Long id;

    @NotNull
    private Long userId;

    @NotNull
    @Column(unique = true)
    private String carPlateNo;

    @NotNull
    private Double paidPrice;
}
