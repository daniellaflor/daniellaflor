package com.projeto.ContaBanco.dto;

import lombok.Data;

@Data
public class ContaResponseDTO {

        private String id;
        private String titular;
        private double saldo;
        private double limiteSaque;



}
