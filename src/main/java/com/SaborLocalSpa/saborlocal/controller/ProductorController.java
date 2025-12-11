// src/main/java/com/SaborLocalSpa/saborlocal/controller/ProductorController.java
package com.SaborLocalSpa.saborlocal.controller;

import com.SaborLocalSpa.saborlocal.model.Productor;
import com.SaborLocalSpa.saborlocal.repository.ProductorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productores")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductorController {

    private final ProductorRepository productorRepository;

    public ProductorController(ProductorRepository productorRepository) {
        this.productorRepository = productorRepository;
    }

    @GetMapping
    public List<Productor> listar() {
        return productorRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Productor> obtener(@PathVariable Long id) {
        return productorRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Productor> crear(@RequestBody Productor productor) {
        Productor nuevo = productorRepository.save(productor);
        return ResponseEntity.ok(nuevo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Productor> actualizar(@PathVariable Long id,
                                               @RequestBody Productor cambios) {
        return productorRepository.findById(id)
                .map(p -> {
                    // si tu entidad tiene setIdProductor / setId, ponlo aquí
                    // cambios.setIdProductor(id);
                    Productor actualizado = productorRepository.save(cambios);
                    return ResponseEntity.ok(actualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!productorRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        productorRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
