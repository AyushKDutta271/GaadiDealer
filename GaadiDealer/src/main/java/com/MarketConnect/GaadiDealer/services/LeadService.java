package com.MarketConnect.GaadiDealer.services;

import com.MarketConnect.GaadiDealer.classconversions.ClassConversion;
import com.MarketConnect.GaadiDealer.dtos.LeadsDto;
import com.MarketConnect.GaadiDealer.entities.Leads;
import com.MarketConnect.GaadiDealer.entities.User;
import com.MarketConnect.GaadiDealer.entities.Vehicle;
import com.MarketConnect.GaadiDealer.repositories.LeadsRepository;
import com.MarketConnect.GaadiDealer.repositories.UserRepository;
import com.MarketConnect.GaadiDealer.repositories.VehicleRepository;
import com.lowagie.text.Document;
import com.lowagie.text.Image;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfDocument;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class LeadService {

    @Autowired
    private LeadsRepository leadsRepository;

    @Autowired
    private ClassConversion classConversion;


    public byte[] generatePdfFile( Long leadId)
    {
       Leads lead= leadsRepository.findById(leadId).orElseThrow(()->new NoSuchElementException("No such lead exist with this userId and carId"));

        ByteArrayOutputStream byteArrayOutputStream=new ByteArrayOutputStream();

        Document document=new Document();

        PdfWriter.getInstance(document,byteArrayOutputStream);

        document.open();

        document.add(new Paragraph("CAR VERIFICATION DOCUMENT"));
        document.add(new Paragraph("Car Details:-"));
        document.add(new Paragraph("Customer Full Name: " + lead.getUserId().getFullName()));
        document.add(new Paragraph("Customer EmailId:"+lead.getUserId().getEmailId()));
        document.add(new Paragraph("Car Plate No: " + lead.getCarId().getCarPlateNo()));
        document.add(new Paragraph("Car Brand: " + lead.getCarId().getCarBrand()));
        document.add(new Paragraph("State: " + lead.getCarId().getState()));
        document.add(new Paragraph("City: " + lead.getCarId().getCity()));
        document.add(new Paragraph("Price: " + lead.getCarId().getCarPrice()));

        if(lead.getCarId().getCarImages()!=null || !lead.getCarId().getCarImages().isEmpty())
        {
            try {
                Image image = Image.getInstance(lead.getCarId().getCarImages().get(0));
                image.scaleToFit(400, 400);
                document.add(image);
            }
            catch(IOException ex)
            {
                throw new RuntimeException("No image found");
            }
        }
        document.add(new Paragraph("Signature: ______________________"));
        document.close();
        return byteArrayOutputStream.toByteArray();
    }

    public String generateFileUri(MultipartFile docFile,Long leadId)
    {
        String fileurl=ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(docFile.getOriginalFilename())
                .toUriString();


        Leads filteredLead= leadsRepository.findById(leadId).orElseThrow(()->new NoSuchElementException("No such lead having this userID and CarID exists!"));

        filteredLead.setUploadedDoc(fileurl);
        leadsRepository.save(filteredLead);
        return "doc file uploaded successfully!";
    }

    public byte[] generatePdfDocForAdmin(Long leadId)
    {
        Leads lead= leadsRepository.findById(leadId).orElseThrow(()->new NoSuchElementException("No such lead with this userId and carId exists!"));

        ByteArrayOutputStream byteArrayOutputStream=new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document,byteArrayOutputStream);
        document.open();
        document.add(new Paragraph(lead.getUploadedDoc()));
        document.close();

        return byteArrayOutputStream.toByteArray();
    }

    public LeadsDto saveLeadToDB(LeadsDto leadsDto)
    {
        classConversion.leadsDtoToLeadsEntity(leadsDto);
        return leadsDto;
    }

    public Page<LeadsDto> getLeadsFromDb(Pageable pageable)
    {
        return leadsRepository.findAll(pageable).map(l->classConversion.leadsEntityToDto(l));
    }

    public LeadsDto updateStatusOfALeadInDB(Long id, Map<String,Boolean> isVerified)
    {
        Leads lead = leadsRepository.findById(id).orElseThrow(()->new NoSuchElementException("No such lead with id exists!"));

        isVerified.forEach((k,v)->lead.setIsVerified(v));

        leadsRepository.save(lead);
        return classConversion.leadsEntityToDto(lead);
    }
}
