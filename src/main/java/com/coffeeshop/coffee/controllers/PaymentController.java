package com.coffeeshop.coffee.controllers;

import com.coffeeshop.coffee.entities.payment;
import com.coffeeshop.coffee.repositories.paymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private paymentRepo paymentRepo;

    // get payment
    @GetMapping
    public List<payment> getAllPayments() {
        return paymentRepo.findAll();
    }

    // update payment status
    @PutMapping("/{id}")
    public payment updatePayment(@PathVariable Long id, @RequestBody payment paymentData) {
        payment existingPayment = paymentRepo.findById(id).orElseThrow();
        existingPayment.setStatus(paymentData.getStatus());
        return paymentRepo.save(existingPayment);
    }

    // delete payment
    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        paymentRepo.deleteById(id);
    }
}
