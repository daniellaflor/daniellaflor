package com.treinar.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record ProdutoRequestDTO(

        @NotBlank(message = "Nome é obrigatório")
        @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
        String nome,

        @Size(max = 500, message = "Descrição muito longa")
        String descricao,

        @NotNull(message = "Preço é obrigatório")
        @Positive(message = "Preço deve ser positivo")
        BigDecimal preco,

        @NotNull(message = "Estoque é obrigatório")
        @Min(value = 0, message = "Estoque não pode ser negativo")
        Integer quantidadeEstoque
) {
}
