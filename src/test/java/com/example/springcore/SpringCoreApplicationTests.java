package com.example.springcore;

import com.example.springcore.controller.HelloController;
import com.example.springcore.dto.GreetingRequest;
import com.example.springcore.dto.HelloResponse;
import com.example.springcore.dto.SystemInfoResponse;
import com.example.springcore.service.HelloService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SpringCoreApplicationTests {

    @Autowired
    private HelloController helloController;

    @Autowired
    private HelloService helloService;

    @Test
    void contextLoads() {
        assertNotNull(helloController);
        assertNotNull(helloService);
    }

    @Test
    void shouldReturnDefaultGreeting() {
        assertEquals("Hello World!", helloController.hello());
        assertEquals("Hello World!", helloController.helloWorld());

        HelloResponse response = helloController.helloApi();
        assertNotNull(response);
        assertEquals("Hello, World!", response.message());
        assertEquals(200, response.status());
    }

    @Test
    void shouldCreateCustomGreeting() {
        GreetingRequest request = new GreetingRequest("Developer", "es");
        ResponseEntity<HelloResponse> response = helloController.greet(request);

        assertNotNull(response);
        assertTrue(response.getStatusCode().is2xxSuccessful());
        assertNotNull(response.getBody());
        assertEquals("¡Hola, Developer!", response.getBody().message());
    }

    @Test
    void shouldReturnSystemTelemetry() {
        ResponseEntity<SystemInfoResponse> response = helloController.info();

        assertNotNull(response);
        assertTrue(response.getStatusCode().is2xxSuccessful());
        assertNotNull(response.getBody());
        assertEquals("UP", response.getBody().status());
        assertNotNull(response.getBody().memoryUsage());
    }
}

