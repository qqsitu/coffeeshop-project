package com.coffeeshop.coffee.entities;

import jakarta.persistence.*;

@Entity
public class menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long item_id;

    private String item_name;
    private String category;
    private Double price;
    private Boolean availability;

    public Long getItem_id() { return item_id; }
    public void setItem_id(Long item_id) { this.item_id = item_id; }

    public String getItem_name() { return item_name; }
    public void setItem_name(String item_name) { this.item_name = item_name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Boolean getAvailability() { return availability; }
    public void setAvailability(Boolean availability) { this.availability = availability; }
}
