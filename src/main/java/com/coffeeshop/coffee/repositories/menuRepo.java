package com.coffeeshop.coffee.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.coffeeshop.coffee.entities.menu;

public interface menuRepo extends JpaRepository<menu, Long> {}
