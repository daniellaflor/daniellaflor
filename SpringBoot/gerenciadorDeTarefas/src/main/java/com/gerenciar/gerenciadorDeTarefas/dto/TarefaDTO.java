package com.gerenciar.gerenciadorDeTarefas.dto;

import com.gerenciar.gerenciadorDeTarefas.model.Status;

public record TarefaDTO(

        String titulo,
        String descricao,
        Status status
){
}
