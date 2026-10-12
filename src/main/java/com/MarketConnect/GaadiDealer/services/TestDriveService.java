package com.MarketConnect.GaadiDealer.services;

import com.MarketConnect.GaadiDealer.classconversions.ClassConversion;
import com.MarketConnect.GaadiDealer.dtos.TestDriveDto;
import com.MarketConnect.GaadiDealer.entities.TestDrive;
import com.MarketConnect.GaadiDealer.repositories.TestdriveRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class TestDriveService {



    @Autowired
    private TestdriveRespository testdriveRespository;

    @Autowired
    private ClassConversion classConversion;



    public TestDriveDto addTestdriveInDB(TestDriveDto testDriveDto)
    {
        testdriveRespository.save(classConversion.testDriveDtoToEntity(testDriveDto));
        return testDriveDto;
    }

    public Page<TestDriveDto> listAllTestDrives(Pageable pageable)
    {
        return testdriveRespository.findAll(pageable).map(td->classConversion.testDriveEntityToDto(td));
    }

    public String removeTestDriveFromDB(Long id)
    {
        testdriveRespository.deleteById(id);
        return "Testdrive has been deleted successfully!";
    }

    public TestDriveDto changeStatusOfATestDrive(Long id, Map<String,Boolean> statusField)
    {
        TestDrive testDrive=testdriveRespository.findById(id).orElseThrow(()->new NoSuchElementException("No such testrive with this ID exists!"));

        statusField.forEach((k,v)->{
            testDrive.setIsDone(v);
        });

        return classConversion.testDriveEntityToDto(testDrive);
    }






}
