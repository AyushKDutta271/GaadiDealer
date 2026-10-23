package com.MarketConnect.GaadiDealer.controllers;

import com.MarketConnect.GaadiDealer.dtos.VehicleDto;
import com.MarketConnect.GaadiDealer.services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/cars")
public class CarController {



    @Autowired
    private VehicleService vehicleService;

    @PostMapping("/addVehicle")
    public ResponseEntity<VehicleDto> addVehicle(@RequestParam("carPlateNo") String carPlateNo,
                                                @RequestParam("carBrand") String carBrand,
                                                @RequestParam("userId") Long userId,
                                                @RequestParam("state") String state,
                                                @RequestParam("city") String city,
                                                @RequestParam("carImages") List<MultipartFile> carImages,
                                                @RequestParam("carPrice") Double carPrice)
    {
        VehicleDto vehicleDto = new VehicleDto();
        vehicleDto.setCarImages(vehicleService.encodeImagesToStringUrl(carImages));
        vehicleDto.setCarPlateNo(carPlateNo);
        vehicleDto.setCarBrand(carBrand);
        vehicleDto.setUserId(userId);
        vehicleDto.setCity(city);
        vehicleDto.setState(state);
        vehicleDto.setCarPrice(carPrice);

        return ResponseEntity.status(HttpStatus.CREATED).body(vehicleService.addVehicleInDB(vehicleDto));
    }


    @PostMapping("/sell")

    public ResponseEntity<VehicleDto> sellVehicle(

                                                  @RequestParam("carPlateNo") String carPlateNo,
                                                  @RequestParam("carBrand") String carBrand,
                                                  @RequestParam("userId") Long userId,
                                                  @RequestParam("state") String state,
                                                  @RequestParam("city") String city,
                                                  @RequestParam("carImages") List<MultipartFile> carImages,
                                                  @RequestParam("carPrice") Double carPrice)
    {
        VehicleDto vehicleDto = new VehicleDto();
        vehicleDto.setCarImages(vehicleService.encodeImagesToStringUrl(carImages));

        vehicleDto.setCarPlateNo(carPlateNo);
        vehicleDto.setCarBrand(carBrand);
        vehicleDto.setUserId(userId);
        vehicleDto.setCity(city);
        vehicleDto.setState(state);
        vehicleDto.setCarPrice(carPrice);

        return ResponseEntity.status(HttpStatus.CREATED).body(vehicleService.addVehicleInDB(vehicleDto));
    }

    @GetMapping("/viewVehicles")
    public ResponseEntity<Page<VehicleDto>> getVehicles(Pageable pageable)
    {
        return ResponseEntity.status(HttpStatus.OK).body(vehicleService.getAllVehicles(pageable));
    }

    @DeleteMapping("/buyVehicle/{id}")
    public ResponseEntity<VehicleDto> buyAVehicle(@PathVariable Long id)
    {
        return ResponseEntity.status(HttpStatus.OK).body(vehicleService.removeVehicleFromDB(id));
    }

    @PutMapping("/updateVehicle/{id}")
    public ResponseEntity<VehicleDto> updateAVehicle(@PathVariable Long id, @RequestParam("carImages") List<MultipartFile> carImages)
    {
        return ResponseEntity.status(HttpStatus.OK).body(vehicleService.changeAVehicleAddImagesInDB(id,carImages));
    }


}
