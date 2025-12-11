package com.SaborLocalSpa.saborlocal.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "productores")
@Data
public class Productor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;          // o idProductor, como prefieras

    private String nombre;
    private String email;
    private String telefono;

}
