package com.coffeeshop.coffee.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coffeeshop.coffee.entities.orders;

public interface ordersRepo extends JpaRepository<orders, Long> {}
