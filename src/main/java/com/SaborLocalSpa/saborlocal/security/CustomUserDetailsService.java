package com.SaborLocalSpa.saborlocal.security;

import com.SaborLocalSpa.saborlocal.model.Cliente;
import com.SaborLocalSpa.saborlocal.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Cliente> clienteOpt = clienteRepository.findByEmail(email);
        if (clienteOpt.isEmpty()) {
            throw new UsernameNotFoundException(" Email no encontrado: " + email);
        }
        return new CustomUserDetails(clienteOpt.get());
    }
}
