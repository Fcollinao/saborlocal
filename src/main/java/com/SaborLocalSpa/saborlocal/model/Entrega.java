package com.SaborLocalSpa.saborlocal.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "entregas")
@Data
public class Entrega {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String direccion;

    private String estado;

}
