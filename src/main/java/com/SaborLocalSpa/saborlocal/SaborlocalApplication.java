package com.SaborLocalSpa.saborlocal;

import com.SaborLocalSpa.saborlocal.model.Cliente;
import com.SaborLocalSpa.saborlocal.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class SaborlocalApplication implements CommandLineRunner {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(SaborlocalApplication.class, args);
    }

    @Override
        public void run(String... args) {
            String email = "prueba@example.com";

            if (clienteRepository.findByEmail(email).isEmpty()) {
                Cliente c = new Cliente();
                c.setNombre("Cliente Prueba");
                c.setEmail(email);
                c.setPassword(passwordEncoder.encode("654321"));
                c.setRol("USER");
                clienteRepository.save(c);
                System.out.println("prueba creada: " + email + " / 654321");
            }
        }
}

