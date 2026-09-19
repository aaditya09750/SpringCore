package com.example.springcore.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record GreetingRequest(
    @NotBlank(message = "Name must not be empty or whitespace")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    String name,

    String language
) {}

