package com.example.backend;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ResumeController {

    @PostMapping("/analyze")
    public Map<String, Object> analyze(@RequestBody Map<String, String> request) {

        String resume = request.get("resume");
        String job = request.get("job");

        RestTemplate restTemplate = new RestTemplate();

        String fastApiUrl = "http://localhost:8000/analyze";

        Map<String, String> body = new HashMap<>();
        body.put("resume", resume);
        body.put("job", job);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map<String, Object>> response = restTemplate.postForEntity(fastApiUrl, entity,
                (Class<Map<String, Object>>) (Class<?>) Map.class);

        return (Map<String, Object>) response.getBody();
    }
}