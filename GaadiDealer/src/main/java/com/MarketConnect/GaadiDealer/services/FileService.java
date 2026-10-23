package com.MarketConnect.GaadiDealer.services;

import com.MarketConnect.GaadiDealer.FileStorageProperties;
import com.MarketConnect.GaadiDealer.repositories.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

@Service
public class FileService {

    private final Path ROOTLOCATION;

    @Autowired
    private VehicleRepository vehicleRepository;

    public FileService(FileStorageProperties props)
    {
        this.ROOTLOCATION= Paths.get(props.getUploadDir());
    }

    public List<String> fileUpload(List<MultipartFile> fileImages)
    {
        List<String> imageURLS=new ArrayList<>();
        fileImages.forEach(img->{
            Path destination=this.ROOTLOCATION.resolve(img.getOriginalFilename());
            try {
                InputStream is = img.getInputStream();
                Files.copy(is,destination, StandardCopyOption.REPLACE_EXISTING);
                String imageURL= ServletUriComponentsBuilder
                        .fromCurrentContextPath()
                        .path(img.getOriginalFilename())
                        .toUriString();
                imageURLS.add(imageURL);
            }
            catch(IOException ex)
            {
                throw new RuntimeException("failed to get bytes of image file!");
            }
        });
        return imageURLS;
    }
}
