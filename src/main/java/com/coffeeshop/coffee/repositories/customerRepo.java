package com.coffeeshop.coffee.repositories;

import com.coffeeshop.coffee.entities.customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface customerRepo extends JpaRepository<customer, Long> {
    customer findByEmail(String email);
}
