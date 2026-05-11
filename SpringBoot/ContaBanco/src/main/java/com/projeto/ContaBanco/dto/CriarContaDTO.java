package com.projeto.ContaBanco.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CriarContaDTO{

    @NotBlank(message = "Nome do titular é obrigatório")
    private String titular;

    @Positive(message = "Saldo inicial deve ser positivo")
    private double saldoInicial;

    @Positive(message = "Limite de saque deve ser positivo")
    private double limiteSaque;
}

