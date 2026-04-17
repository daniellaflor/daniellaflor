package com.treinar.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthDTO(

        @NotBlank(message = "Login é obrigatório")
                String login,

        @NotBlank(message = "Senha é obrigatória")
        String password
) {
}
