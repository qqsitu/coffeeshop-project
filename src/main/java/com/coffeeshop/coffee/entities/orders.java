package com.coffeeshop.coffee.entities;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "orders")
public class orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long order_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private customer customer;

    private Date order_date;
    private double total;
    private String status;

    // Getters and setters
}
