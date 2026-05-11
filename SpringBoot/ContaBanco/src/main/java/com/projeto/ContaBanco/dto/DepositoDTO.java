package com.projeto.ContaBanco.dto;

import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class DepositoDTO{

        @Positive(message = "Valor do depósito deve ser positivo")
        private double valor;
    }

