package com.SaborLocalSpa.saborlocal.controller;

import com.SaborLocalSpa.saborlocal.dto.LoginRequest;
import com.SaborLocalSpa.saborlocal.dto.LoginResponse;
import com.SaborLocalSpa.saborlocal.dto.RegisterRequest;
import com.SaborLocalSpa.saborlocal.model.Cliente;
import com.SaborLocalSpa.saborlocal.repository.ClienteRepository;
import com.SaborLocalSpa.saborlocal.security.CustomUserDetails;
import com.SaborLocalSpa.saborlocal.security.JwtUtil;
import com.SaborLocalSpa.saborlocal.security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")  // ajusta si tu frontend usa otro puerto
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Credenciales inválidas"));
        }

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(loginRequest.getEmail());
        String token = jwtUtil.generateToken(userDetails);
        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;

        String rol = customUserDetails.getAuthorities()
                .iterator().next().getAuthority().replace("ROLE_", "");

        LoginResponse response = new LoginResponse(
                token,
                customUserDetails.getUsername(),
                rol
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (clienteRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "El correo ya está registrado"));
        }

        Cliente cliente = new Cliente();
        cliente.setNombre(request.getNombre());
        cliente.setEmail(request.getEmail());
        cliente.setPassword(passwordEncoder.encode(request.getPassword()));
        cliente.setRol("USER"); // si quieres rol por defecto

        clienteRepository.save(cliente);

        return ResponseEntity.ok(Map.of("message", "Usuario registrado correctamente"));
    }
}
