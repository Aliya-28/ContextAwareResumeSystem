package com.example.backend;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ResumeController {

    private final RestTemplate restTemplate = new RestTemplate();

    // =========================================================
    // 1. TEXT RESUME ANALYSIS
    // =========================================================

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyze(
            @RequestBody Map<String, String> request) {

        String resume = request.get("resume");
        String job = request.get("job");

        String fastApiUrl = "http://127.0.0.1:8001/analyze";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = Map.of(
                "resume", resume,
                "job", job);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                fastApiUrl,
                entity,
                Map.class);

        return ResponseEntity.ok(response.getBody());
    }

    // =========================================================
    // 2. PDF RESUME UPLOAD
    // =========================================================

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("job") String job) throws IOException {

        String fastApiUrl = "http://127.0.0.1:8001/upload";

        // Read PDF bytes
        byte[] pdfBytes = file.getBytes();

        // Create resource from PDF bytes
        ByteArrayResource resource = new ByteArrayResource(pdfBytes) {

            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };

        // Multipart request body
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

        body.add("file", resource);
        body.add("job", job);

        // Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // Send PDF to FastAPI
        ResponseEntity<Map> response = restTemplate.postForEntity(
                fastApiUrl,
                requestEntity,
                Map.class);

        return ResponseEntity.ok(response.getBody());
    }
}