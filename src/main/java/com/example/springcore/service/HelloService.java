package com.example.springcore.service;

import com.example.springcore.dto.GreetingRequest;
import com.example.springcore.dto.HelloResponse;
import com.example.springcore.dto.SystemInfoResponse;

public interface HelloService {
    HelloResponse createGreeting(GreetingRequest request);
    HelloResponse getDefaultGreeting();
    SystemInfoResponse getSystemTelemetry();
}

