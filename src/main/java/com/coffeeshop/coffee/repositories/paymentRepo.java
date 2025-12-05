package com.coffeeshop.coffee.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coffeeshop.coffee.entities.payment;

public interface paymentRepo extends JpaRepository<payment, Long> {}
