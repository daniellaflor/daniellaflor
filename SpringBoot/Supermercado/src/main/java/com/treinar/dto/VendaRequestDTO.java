package com.treinar.dto;

import java.math.BigDecimal;

public record VendaRequestDTO(

        Long id,
        String nome,
        String descricao,
        BigDecimal preco,
        Integer quantidadeEstoque,
        Integer quantidadeVendida
) {
}
