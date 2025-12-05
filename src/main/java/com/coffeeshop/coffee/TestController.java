package com.coffeeshop.coffee;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/status")
    public String home() {
        return "CoffeeShop API is running!";
    }
}
