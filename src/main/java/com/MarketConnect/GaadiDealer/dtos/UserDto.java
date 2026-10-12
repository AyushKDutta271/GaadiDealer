package com.MarketConnect.GaadiDealer.dtos;


import com.MarketConnect.GaadiDealer.entities.UserType;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
public class UserDto {

    private Long id;

    @NotNull
    @Length(max = 10,min=3)
    private String fullName;

    @NotNull
    @Column(unique = true)
    @Pattern(regexp="^[a-zA-Z0-9]+@gmail\\.[a-z+]$")
    private String emailId;

    @NotNull
    @Length(max = 10,min=5)
    private String password;
    private String confirmPassword;



    private String userState;
    private String userCity;
    private UserType userType;



}
