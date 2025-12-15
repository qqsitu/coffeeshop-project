package com.coffeeshop.coffee.controllers;

import com.coffeeshop.coffee.entities.customer;
import com.coffeeshop.coffee.repositories.customerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private customerRepo repo;

    @GetMapping
    public List<customer> getAllCustomers() {
        return repo.findAll();
    }

    @PostMapping
    public customer createCustomer(@RequestBody customer c) {
        return repo.save(c);
    }

}
