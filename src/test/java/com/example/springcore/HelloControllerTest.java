package com.example.springcore;

import com.example.springcore.controller.HelloController;
import com.example.springcore.dto.GreetingRequest;
import com.example.springcore.dto.HelloResponse;
import com.example.springcore.dto.SystemInfoResponse;
import com.example.springcore.exception.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class HelloControllerTest {

    @Autowired
    private HelloController helloController;

    @Test
    void shouldReturnHelloString() {
        assertEquals("Hello World!", helloController.hello());
        assertEquals("Hello World!", helloController.helloWorld());
    }

    @Test
    void shouldReturnHelloApiResponse() {
        HelloResponse response = helloController.helloApi();
        assertNotNull(response);
        assertEquals("Hello, World!", response.message());
        assertEquals(200, response.status());
    }

    @Test
    void shouldHandleMultilingualGreeting() {
        GreetingRequest request = new GreetingRequest("Alice", "fr");
        ResponseEntity<HelloResponse> response = helloController.greet(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Bonjour, Alice!", response.getBody().message());
    }

    @Test
    void shouldProvideSystemInfo() {
        ResponseEntity<SystemInfoResponse> response = helloController.info();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("UP", response.getBody().status());
    }

    @Test
    void shouldThrowResourceNotFoundExceptionOnSimulation() {
        assertThrows(ResourceNotFoundException.class, () -> helloController.simulateError("notfound"));
    }
}

