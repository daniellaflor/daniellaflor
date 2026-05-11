package com.projeto.ContaBanco.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Movimentacao {

        private LocalDateTime data;
        private String tipo;
        private double valor;
        private double saldoApos;

        public Movimentacao(String tipo, double valor, double saldoApos) {
            this.data = LocalDateTime.now();
            this.tipo = tipo;
            this.valor = valor;
            this.saldoApos = saldoApos;
        }
    }

