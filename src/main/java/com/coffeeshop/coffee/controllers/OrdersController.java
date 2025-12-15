package com.coffeeshop.coffee.controllers;

import com.coffeeshop.coffee.entities.customer;
import com.coffeeshop.coffee.entities.order;
import com.coffeeshop.coffee.repositories.ordersRepo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrdersController {


    @Autowired
    private ordersRepo repo;

    @GetMapping
    public List<order> getAll() { return repo.findAll(); }

    @PostMapping
    public order add(@RequestBody order order) { return repo.save(order); }

    @PutMapping("/{id}")
    public order update(@PathVariable Long id, @RequestBody order orderData) {
        order o = repo.findById(id).orElseThrow();
        o.setStatus(orderData.getStatus());
        return repo.save(o);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { repo.deleteById(id); }
}