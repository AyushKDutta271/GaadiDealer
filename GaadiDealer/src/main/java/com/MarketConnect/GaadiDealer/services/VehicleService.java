package com.MarketConnect.GaadiDealer.services;

import com.MarketConnect.GaadiDealer.FileStorageProperties;
import com.MarketConnect.GaadiDealer.classconversions.ClassConversion;
import com.MarketConnect.GaadiDealer.dtos.VehicleDto;
import com.MarketConnect.GaadiDealer.entities.Vehicle;
import com.MarketConnect.GaadiDealer.repositories.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class VehicleService {



    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private ClassConversion classConversion;

    @Autowired
    private FileService fileService;


    public VehicleDto addVehicleInDB(VehicleDto vehicleDto)
    {
       vehicleRepository.save(classConversion.vehicleDtoToVehicleEntity(vehicleDto));
       return vehicleDto;
    }

    public List<String> encodeImagesToStringUrl(List<MultipartFile> carImages)
    {

        if(carImages==null || carImages.isEmpty())
        {
            throw new RuntimeException("Images not available!");
        }


    return fileService.fileUpload(carImages);
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


    public VehicleDto changeAVehicleAddImagesInDB(Long id, List<MultipartFile> field)
    {
        Vehicle vehicle=vehicleRepository.findById(id).orElseThrow(()->new NoSuchElementException("No such car found in DB!"));
//        System.out.println("Vehicle after updating image: "+ vehicle);
         List<String> imageURLS= encodeImagesToStringUrl(field);
                                    vehicle.setCarImages(imageURLS);


        vehicleRepository.save(vehicle);
        return classConversion.vehicleToVehicleDto(vehicle);
    }
}
