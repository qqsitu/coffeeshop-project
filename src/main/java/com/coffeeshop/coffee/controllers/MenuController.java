package com.coffeeshop.coffee.controllers;

import com.coffeeshop.coffee.entities.menu;
import com.coffeeshop.coffee.repositories.menuRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    @Autowired
    private menuRepo repo;

    // Get all menu items
    @GetMapping
    public List<menu> getAll() {
        return repo.findAll();
    }

    // Add new menu item
    @PostMapping
    public menu add(@RequestBody menu item) {
        return repo.save(item);
    }

    // Update menu item safely
    @PutMapping("/{id}")
    public menu update(@PathVariable Long id, @RequestBody menu item) {
        menu m = repo.findById(id).orElseThrow();

        // Only update fields that are non-null
        if (item.getItem_name() != null) m.setItem_name(item.getItem_name());
        if (item.getCategory() != null) m.setCategory(item.getCategory());
        if (item.getPrice() != null) m.setPrice(item.getPrice());
        if (item.getAvailability() != null) m.setAvailability(item.getAvailability());

        return repo.save(m);
    }

    // Delete menu item
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
