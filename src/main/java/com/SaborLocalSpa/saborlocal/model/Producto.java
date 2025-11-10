package com.SaborLocalSpa.saborlocal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "productos")
@Data
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nombre de producto es obligatorio")
    @Column(nullable = false)
    private String titulo;

    @NotBlank(message = "El tipo de producto es obligatorio")
    @Column(nullable = false)
    private String autor;

    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer anioPublicacion;

    private String genero;

    @Pattern(regexp = "^[0-9-]*$", message = "ISBN inválido (solo dígitos y guiones)")
    @Column(unique = true)
    private String isbn;

    @Min(0)
    private Integer stock;

    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal precio;

    // getters y setters (o usa Lombok @Data)
}