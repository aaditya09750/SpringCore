package com.example.springcore.dto;

import java.time.Instant;
import java.util.List;

public record ErrorResponse(
    int status,
    String error,
    String message,
    String path,
    Instant timestamp,
    List<String> validationErrors
) {
    public ErrorResponse(int status, String error, String message, String path, Instant timestamp) {
        this(status, error, message, path, timestamp, List.of());
    }
}

