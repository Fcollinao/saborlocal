// src/main/java/com/SaborLocalSpa/saborlocal/model/Cliente.java
package com.SaborLocalSpa.saborlocal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "clientes", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Data
@NoArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nombre;

    @NotBlank
    @Email
    @Column(unique = true) // ¡IMPORTANTE!
    private String email; // → será el "username" para Spring Security

    @NotBlank
    private String password; // → se guardará encriptada (BCrypt)

    private String rol = "USER"; // → puede ser "USER" o "ADMIN"

    // Puedes agregar más campos: teléfono, dirección, etc.
}