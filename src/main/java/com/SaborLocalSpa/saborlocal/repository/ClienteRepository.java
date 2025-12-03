package com.SaborLocalSpa.saborlocal.repository;

import com.SaborLocalSpa.saborlocal.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Este método lo genera Spring Data JPA automáticamente
    Optional<Cliente> findByEmail(String email);
}
