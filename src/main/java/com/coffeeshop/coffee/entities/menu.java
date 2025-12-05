package com.coffeeshop.coffee.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "menu")
public class menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long item_id;

    private String item_name;
    private String category;
    private double price;
    private boolean availability;

    // Getters and setters
}
