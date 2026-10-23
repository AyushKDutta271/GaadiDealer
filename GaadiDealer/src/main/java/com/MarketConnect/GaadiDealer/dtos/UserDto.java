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
    @Length(max = 10,min=3,message = "name should be within 3 and 10 size")
    private String fullName;

    @NotNull
    @Column(unique = true)
    @Pattern(regexp="^[a-zA-Z0-9]+@gmail\\.[a-z+]$", message = "email should follow the patter abc23@gmail.com")
    private String emailId;

    @NotNull
    @Length(max = 10,min=5, message = "password should be within 5 and 10")
    private String password;
    private String confirmPassword;


    @NotNull
    private String userState;

    @NotNull
    private String userCity;

    @NotNull
    private UserType userType;



}
