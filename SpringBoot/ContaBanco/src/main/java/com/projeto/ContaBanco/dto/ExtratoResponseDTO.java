package com.projeto.ContaBanco.dto;

import lombok.Data;

import java.util.List;

@Data
public class ExtratoResponseDTO {

        private String titular;
        private String idConta;
        private double saldoAtual;
        private List<MovimentacaoDTO> movimentacoes;

        @Data
        public static class MovimentacaoDTO {
            private String data;
            private String tipo;
            private double valor;
            private double saldoApos;
        }


}
