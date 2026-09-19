package com.example.springcore.controller;

import com.example.springcore.dto.GreetingRequest;
import com.example.springcore.dto.HelloResponse;
import com.example.springcore.dto.SystemInfoResponse;
import com.example.springcore.exception.ResourceNotFoundException;
import com.example.springcore.service.HelloService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    private final HelloService helloService;

    public HelloController(HelloService helloService) {
        this.helloService = helloService;
    }

    @GetMapping(value = {"/hello", "//hello"}, produces = MediaType.TEXT_PLAIN_VALUE)
    public String hello() {
        return "Hello World!";
    }

    @GetMapping(value = {"/api/hello-world", "//api/hello-world"}, produces = MediaType.TEXT_PLAIN_VALUE)
    public String helloWorld() {
        return "Hello World!";
    }

    @GetMapping({"/api/hello", "//api/hello"})
    public HelloResponse helloApi() {
        return helloService.getDefaultGreeting();
    }

    @PostMapping({"/api/greet", "//api/greet"})
    public ResponseEntity<HelloResponse> greet(@Valid @RequestBody GreetingRequest request) {
        HelloResponse response = helloService.createGreeting(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping({"/api/info", "//api/info"})
    public ResponseEntity<SystemInfoResponse> info() {
        return ResponseEntity.ok(helloService.getSystemTelemetry());
    }

    @GetMapping("/api/simulate-error")
    public ResponseEntity<Void> simulateError(@RequestParam(defaultValue = "notfound") String type) {
        if ("notfound".equalsIgnoreCase(type)) {
            throw new ResourceNotFoundException("Demo resource with type '" + type + "' was not found.");
        }
        throw new RuntimeException("Simulated unexpected internal server error.");
    }
}

