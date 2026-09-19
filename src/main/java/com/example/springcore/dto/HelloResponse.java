package com.example.springcore.dto;

import java.time.Instant;

public record HelloResponse(
    String message,
    int status,
    Instant timestamp,
    String environment,
    String correlationId
) {}

