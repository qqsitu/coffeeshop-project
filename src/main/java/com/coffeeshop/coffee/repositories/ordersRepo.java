package com.coffeeshop.coffee.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coffeeshop.coffee.entities.order;

public interface ordersRepo extends JpaRepository<order, Long> {}
