package com.treinar.dto;

import jakarta.validation.constraints.NotNull;

public record ClienteResponseDTO (

        Long id,
        String nome,
        @NotNull
        String email,
        String telefone
){
}
