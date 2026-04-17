package com.treinar.dto;

import java.math.BigDecimal;

public record ProdutoResponseDTO(

        Long id,
        String nome,
        String descricao,
        BigDecimal preco,
        Integer quantidadeEstoque,
        Integer quantidadeVendida
) {
}
