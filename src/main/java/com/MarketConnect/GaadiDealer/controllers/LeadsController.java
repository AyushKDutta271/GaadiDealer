package com.MarketConnect.GaadiDealer.controllers;

import com.MarketConnect.GaadiDealer.dtos.LeadsDto;
import com.MarketConnect.GaadiDealer.services.LeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Map;

@RestController
@RequestMapping("/leads")
public class LeadsController {

    @Autowired
    private LeadService leadService;



        @GetMapping("/customerVerificationDoc/download/{leadId}")
        public ResponseEntity<?> verificationDocDownload(@PathVariable Long leadId)
        {

            byte[] pdfFileBytes=leadService.generatePdfFile(leadId);
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.APPLICATION_PDF);
            httpHeaders.setContentDispositionFormData("attachment","car-verification.pdf");

            return ResponseEntity.ok().headers(httpHeaders).body(pdfFileBytes);
        }

    @PostMapping("/customerVerificationDoc/upload/{leadId}")
    public ResponseEntity<?> verificationDocUpload(@RequestParam MultipartFile docFile,@PathVariable Long leadId)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(leadService.generateFileUri(docFile,leadId));
    }

        @GetMapping("/adminVerificationDoc/download/{leadId}")
        public ResponseEntity<?> downloadFileFromAdmin(@PathVariable Long leadId)
        {
            leadService.generatePdfDocForAdmin(leadId);
            return ResponseEntity.status(HttpStatus.OK).build();
        }


        @PostMapping("/save")
        public ResponseEntity<LeadsDto> saveLead(@RequestBody LeadsDto leadsDto)
        {
            return ResponseEntity.status(HttpStatus.CREATED).body(leadService.saveLeadToDB(leadsDto));
        }

        @GetMapping("/getLeads")
        public ResponseEntity<Page<LeadsDto>> getLeads(Pageable pageable)
        {
            return ResponseEntity.status(HttpStatus.OK).body(leadService.getLeadsFromDb(pageable));
        }

        @PatchMapping("/updateStatus/{id}")
        public ResponseEntity<LeadsDto> updateStatusOfALead(@PathVariable Long id, @RequestBody Map<String,Boolean> isVerified)
        {
            return ResponseEntity.status(HttpStatus.OK).body(leadService.updateStatusOfALeadInDB(id,isVerified));
        }
}
