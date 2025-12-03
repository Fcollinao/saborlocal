// src/main/java/com/SaborLocalSpa/saborlocal/controller/AuthController.java
package com.SaborLocalSpa.saborlocal.controller;

import com.SaborLocalSpa.saborlocal.dto.LoginRequest;
import com.SaborLocalSpa.saborlocal.dto.LoginResponse;
import com.SaborLocalSpa.saborlocal.security.CustomUserDetails;
import com.SaborLocalSpa.saborlocal.security.JwtUtil;
import com.SaborLocalSpa.saborlocal.security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

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
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
        final String token = jwtUtil.generateToken(userDetails);
        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;

        return ResponseEntity.ok(new LoginResponse(
            token,
            customUserDetails.getUsername(),
            customUserDetails.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "")
        ));
    }
}