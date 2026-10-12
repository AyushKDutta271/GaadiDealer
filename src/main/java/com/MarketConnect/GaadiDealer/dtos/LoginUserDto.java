package com.MarketConnect.GaadiDealer.dtos;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class LoginUserDto {

    @NotNull
    @Column(unique = true)
    @Pattern(regexp="^[a-zA-Z0-9]+@gmail\\.[a-z+]$")
    private String emailId;

    @NotNull
    @Length(max = 10,min=5)
    private String password;
}
