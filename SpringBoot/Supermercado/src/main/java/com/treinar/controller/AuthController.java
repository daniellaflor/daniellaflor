package com.treinar.controller;

import com.treinar.dto.AuthDTO;
import com.treinar.dto.LoginResponseDTO;
import com.treinar.model.User;
import com.treinar.repository.UserRepository;
import com.treinar.service.TokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository repository;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
        var auth = authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid AuthDTO data) {
        if (repository.existsByLogin(data.login())) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Login já existe"));
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User();
        newUser.setLogin(data.login());
        newUser.setPassword(encryptedPassword);
        newUser.setRole("USER");

        repository.save(newUser);
        return ResponseEntity.ok(Map.of("mensagem", "Usuário cadastrado com sucesso"));
    }
}
