package com.SaborLocalSpa.saborlocal.service;

import com.SaborLocalSpa.saborlocal.model.Productor;
import com.SaborLocalSpa.saborlocal.repository.ProductorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductorService {

    private final ProductorRepository productorRepository;

    public ProductorService(ProductorRepository productorRepository) {
        this.productorRepository = productorRepository;
    }

    public Productor crear(Productor productor) {
        return productorRepository.save(productor);
    }

    public List<Productor> listar() {
        return productorRepository.findAll();
    }

    public Optional<Productor> obtenerPorId(Long id) {
        return productorRepository.findById(id);
    }

    public Productor actualizar(Long id, Productor cambios) {
        return productorRepository.findById(id)
                .map(p -> {
                    // aquí copias los campos que quieras actualizar
                    p.setNombre(cambios.getNombre());
                    p.setEmail(cambios.getEmail());
                    p.setTelefono(cambios.getTelefono());
                    return productorRepository.save(p);
                })
                .orElseThrow(() -> new RuntimeException("Productor no encontrado"));
    }

    public void eliminar(Long id) {
        productorRepository.deleteById(id);
    }
}
