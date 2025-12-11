// src/main/java/com/SaborLocalSpa/saborlocal/controller/EntregaController.java
package com.SaborLocalSpa.saborlocal.controller;

import com.SaborLocalSpa.saborlocal.model.Entrega;
import com.SaborLocalSpa.saborlocal.repository.EntregaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/entregas")
@CrossOrigin(origins = "http://localhost:3000")
public class EntregaController {

    private final EntregaRepository entregaRepository;

    public EntregaController(EntregaRepository entregaRepository) {
        this.entregaRepository = entregaRepository;
    }

    // GET /entregas  -> listar todas las entregas
    @GetMapping
    public List<Entrega> listar() {
        return entregaRepository.findAll();
    }

    // GET /entregas/{id}  -> obtener una entrega por id
    @GetMapping("/{id}")
        public ResponseEntity<Entrega> obtener(@PathVariable Long id) {
            return entregaRepository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }


    // POST /entregas  -> crear nueva entrega
    @PostMapping
    public ResponseEntity<Entrega> crear(@RequestBody Entrega entrega) {
        Entrega nueva = entregaRepository.save(entrega);
        return ResponseEntity.ok(nueva);
    }

    // PUT /entregas/{id}  -> actualizar entrega existente
    @PutMapping("/{id}")
    public ResponseEntity<Entrega> actualizar(@PathVariable Long id,
                                              @RequestBody Entrega cambios) {
        Optional<Entrega> optional = entregaRepository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Entrega e = optional.get();
        // Ajusta estos setters a los campos reales de tu entidad Entrega:
        // e.setEstado(cambios.getEstado());
        // e.setFechaEntrega(cambios.getFechaEntrega());
        // e.setDireccion(cambios.getDireccion());

        Entrega actualizada = entregaRepository.save(e);
        return ResponseEntity.ok(actualizada);
    }

    // DELETE /entregas/{id}  -> eliminar entrega
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!entregaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entregaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
