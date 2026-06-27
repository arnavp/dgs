package com.milkenrte.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/catalog")
@CrossOrigin(origins = "*")
public class CatalogController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> getCatalog() {
        Map<String, Object> catalog = new HashMap<>();

        List<String> products = List.of(
                "Milk", "Curd", "Paneer", "Ghee", "Butter",
                "Cheese", "Srikhand", "UHT Milk", "Mawa",
                "Butter Milk", "Lassi"
        );

        List<String> brands = List.of(
                "Amul", "Gowardhan", "Gokul", "Govind", "Nandini",
                "Mother Dairy", "Warna", "Chitale", "Heritage",
                "Nature Delight", "Mahananda", "Akshara"
        );

        List<String> quantities = List.of(
                "Minimum 12 Ltr/10kg",
                "12 to 50 Ltr/kg",
                "50 to 100 Ltr/kg",
                "100 to 500 Ltr/kg",
                "500+ Ltr/kg"
        );

        catalog.put("products", products);
        catalog.put("brands", brands);
        catalog.put("quantities", quantities);

        return ResponseEntity.ok(catalog);
    }
}
