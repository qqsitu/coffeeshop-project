package com.coffeeshop.coffee.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coffeeshop.coffee.entities.customer;

public interface customerRepo extends JpaRepository<customer, Long> {}
