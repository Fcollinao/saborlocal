package com.SaborLocalSpa.saborlocal.service;

import com.SaborLocalSpa.saborlocal.model.Entrega;
import com.SaborLocalSpa.saborlocal.repository.EntregaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntregaService {

    private final EntregaRepository entregaRepository;

    public EntregaService(EntregaRepository entregaRepository) {
        this.entregaRepository = entregaRepository;
    }

    public Entrega crear(Entrega entrega) {
        return entregaRepository.save(entrega);
    }

    public List<Entrega> listar() {
        return entregaRepository.findAll();
    }

    public Optional<Entrega> obtenerPorId(Long id) {
        return entregaRepository.findById(id);
    }

    public void eliminar(Long id) {
        entregaRepository.deleteById(id);
    }
}
