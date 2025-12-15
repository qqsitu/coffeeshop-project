package com.coffeeshop.coffee.entities;

import jakarta.persistence.*;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="orders")
public class order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long order_id;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnoreProperties({"orders"})
    private customer customer;

    private Date order_date;
    private double total;
    private String status;


    public Long getOrder_id() { return order_id; }
    public void setOrder_id(Long order_id) { this.order_id = order_id; }

    public customer getCustomer() { return customer; }
    public void setCustomer(customer customer) { this.customer = customer; }

    public Date getOrder_date() { return order_date; }
    public void setOrder_date(Date order_date) { this.order_date = order_date; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
}

