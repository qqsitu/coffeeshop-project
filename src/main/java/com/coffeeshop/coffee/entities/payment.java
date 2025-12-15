package com.coffeeshop.coffee.entities;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name="payment")
public class payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payment_id;

    @ManyToOne
    @JoinColumn(name="order_id")
    private order order;

    private double amount;
    private String status;
    private Date payment_date;


    public Long getPayment_id() { return payment_id; }
    public void setPayment_id(Long payment_id) { this.payment_id = payment_id; }
    
    public order getOrder() { return order; }
    public void Order(order order) { this.order = order; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Date getPayment_date() { return payment_date; }
    public void setPayment_date(Date payment_date) { this.payment_date = payment_date; }
    
}
