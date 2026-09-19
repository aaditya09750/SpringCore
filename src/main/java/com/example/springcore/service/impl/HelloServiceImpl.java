package com.example.springcore.service.impl;

import com.example.springcore.common.AppConstants;
import com.example.springcore.config.CorrelationIdFilter;
import com.example.springcore.dto.GreetingRequest;
import com.example.springcore.dto.HelloResponse;
import com.example.springcore.dto.SystemInfoResponse;
import com.example.springcore.service.HelloService;
import com.example.springcore.service.SystemService;
import java.time.Instant;
import org.slf4j.MDC;
import org.springframework.stereotype.Service;

@Service
public class HelloServiceImpl implements HelloService {

    private final SystemService systemService;

    public HelloServiceImpl(SystemService systemService) {
        this.systemService = systemService;
    }

    @Override
    public HelloResponse createGreeting(GreetingRequest request) {
        String name = (request != null && request.name() != null) ? request.name().trim() : AppConstants.DEFAULT_GREETING_NAME;
        String lang = (request != null && request.language() != null) ? request.language().toLowerCase() : AppConstants.DEFAULT_GREETING_LANGUAGE;

        String message = switch (lang) {
            case "es" -> "¡Hola, " + name + "!";
            case "fr" -> "Bonjour, " + name + "!";
            case "de" -> "Hallo, " + name + "!";
            case "jp" -> "こんにちは, " + name + "!";
            default -> "Hello, " + name + "!";
        };

        String correlationId = MDC.get(CorrelationIdFilter.MDC_TRACE_ID_KEY);
        return new HelloResponse(message, 200, Instant.now(), "development", correlationId);
    }

    @Override
    public HelloResponse getDefaultGreeting() {
        return createGreeting(new GreetingRequest(AppConstants.DEFAULT_GREETING_NAME, AppConstants.DEFAULT_GREETING_LANGUAGE));
    }

    @Override
    public SystemInfoResponse getSystemTelemetry() {
        return systemService.getSystemTelemetry();
    }
}

