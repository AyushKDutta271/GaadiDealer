package com.MarketConnect.GaadiDealer.services;

import com.MarketConnect.GaadiDealer.FileStorageProperties;
import com.MarketConnect.GaadiDealer.classconversions.ClassConversion;
import com.MarketConnect.GaadiDealer.dtos.VehicleDto;
import com.MarketConnect.GaadiDealer.entities.Vehicle;
import com.MarketConnect.GaadiDealer.repositories.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

public class VehicleService {

    private final Path rootLocation;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private ClassConversion classConversion;

    public VehicleService(FileStorageProperties props)
    {
        this.rootLocation= Paths.get(props.getUploadDir());
    }

    public VehicleDto addVehicleInDB(VehicleDto vehicleDto)
    {
       vehicleRepository.save(classConversion.vehicleDtoToVehicleEntity(vehicleDto));
       return vehicleDto;
    }

    public List<String> encodeImagesToStringUrl(List<MultipartFile> carImages)
    {
        List<String> imageURLS=new ArrayList<>();
        if(carImages!=null || carImages.isEmpty())
        {
            throw new RuntimeException("Images not available!");
        }

        carImages.stream().forEach(image->{
                String imageURL= ServletUriComponentsBuilder
                        .fromCurrentContextPath()
                        .path(image.getOriginalFilename())
                        .toUriString();
                imageURLS.add(imageURL);
        });
    return imageURLS;
    }


    public Page<VehicleDto> getAllVehicles(Pageable pageable)
    {
        return vehicleRepository.findAll(pageable).map(v->classConversion.vehicleToVehicleDto(v));
    }

    public VehicleDto removeVehicleFromDB(Long id)
    {
        Vehicle vehicle=vehicleRepository.findById(id).orElseThrow(()->new NoSuchElementException("Vehicle with this ID doesn't exist!"));
        vehicleRepository.deleteById(id);
        return classConversion.vehicleToVehicleDto(vehicle);
    }
}
