package com.MarketConnect.GaadiDealer.controllers;

import com.MarketConnect.GaadiDealer.classconversions.ClassConversion;
import com.MarketConnect.GaadiDealer.dtos.TestDriveDto;
import com.MarketConnect.GaadiDealer.services.TestDriveService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/testdrives")
public class TestDriveController {

    @Autowired
    private TestDriveService testDriveService;

    @Autowired
    private ClassConversion classConversion;

    @PostMapping("/add")
    public ResponseEntity<TestDriveDto> addTestDrive(@RequestBody TestDriveDto testDriveDto)
    {
        return  ResponseEntity.status(HttpStatus.CREATED).body(testDriveService.addTestdriveInDB(testDriveDto));
    }

    @GetMapping("/get")
    public ResponseEntity<Page<TestDriveDto>> getTestDrives(Pageable pageable)
    {
        return ResponseEntity.status(HttpStatus.OK).body(testDriveService.listAllTestDrives(pageable));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTestDrive(@PathVariable Long id)
    {
        testDriveService.removeTestDriveFromDB(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PatchMapping("/updateStatus/{id}")
    public ResponseEntity<TestDriveDto> updateStatus(@PathVariable Long id,@RequestBody Map<String,Boolean> statusField)
    {
        return ResponseEntity.status(HttpStatus.OK).body(testDriveService.changeStatusOfATestDrive(id,statusField));
    }



}
