package com.SaborLocalSpa.saborlocal.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String email;
    private String rol;

    public LoginResponse(String token, String email, String rol) {
        this.token = token;
        this.email = email;
        this.rol = rol;
    }
}
