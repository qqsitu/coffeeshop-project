package com.coffeeshop.coffee.entities;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "payment")
public class payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payment_id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private orders order;

    private String method;
    private Date date;

    // Getters and setters
}
