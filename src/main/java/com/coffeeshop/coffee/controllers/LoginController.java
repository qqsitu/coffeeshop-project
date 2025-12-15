package com.coffeeshop.coffee.controllers;

import com.coffeeshop.coffee.entities.customer;
import com.coffeeshop.coffee.repositories.customerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private customerRepo customerRepo;

   @PostMapping("/login")
    public Map<String,String> login(@RequestBody Map<String,String> credentials){
        String email = credentials.get("email");
        String password = credentials.get("password");

        customer user = customerRepo.findByEmail(email);
        Map<String,String> res = new HashMap<>();

        if(user != null && user.getPassword().equals(password)){
            res.put("status", "success");
            res.put("role", user.getRole());
        } else {
            res.put("status", "fail");
        }
        return res;
    }

}
