package com.example.springcore.dto;

import java.util.Map;

public record SystemInfoResponse(
    String application,
    String version,
    String status,
    String javaVersion,
    String springBootVersion,
    long uptimeSeconds,
    Map<String, Object> memoryUsage
) {}

