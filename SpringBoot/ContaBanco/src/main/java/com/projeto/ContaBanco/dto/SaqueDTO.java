package com.projeto.ContaBanco.dto;

import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class SaqueDTO{

        @Positive(message = "Valor do saque deve ser positivo")
        private double valor;
    }

