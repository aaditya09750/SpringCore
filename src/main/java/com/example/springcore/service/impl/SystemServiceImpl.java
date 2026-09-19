package com.example.springcore.service.impl;

import com.example.springcore.common.AppConstants;
import com.example.springcore.dto.SystemInfoResponse;
import com.example.springcore.service.SystemService;
import java.lang.management.ManagementFactory;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SystemServiceImpl implements SystemService {

    @Value("${spring.application.name:SpringCore}")
    private String appName;

    @Override
    public SystemInfoResponse getSystemTelemetry() {
        long uptimeSeconds = ManagementFactory.getRuntimeMXBean().getUptime() / 1000;

        Runtime runtime = Runtime.getRuntime();
        long totalMemory = runtime.totalMemory() / (1024 * 1024);
        long freeMemory = runtime.freeMemory() / (1024 * 1024);
        long usedMemory = totalMemory - freeMemory;
        long maxMemory = runtime.maxMemory() / (1024 * 1024);

        Map<String, Object> memoryStats = new LinkedHashMap<>();
        memoryStats.put("usedMb", usedMemory);
        memoryStats.put("freeMb", freeMemory);
        memoryStats.put("totalMb", totalMemory);
        memoryStats.put("maxMb", maxMemory);
        memoryStats.put("availableProcessors", runtime.availableProcessors());

        return new SystemInfoResponse(
                appName.equals("demo") ? AppConstants.APP_NAME : appName,
                "0.0.1-SNAPSHOT",
                "UP",
                System.getProperty("java.version"),
                "4.1.1",
                uptimeSeconds,
                memoryStats
        );
    }
}

