package com.gerenciar.gerenciadorDeTarefas.exception;

public class TarefaNotFoundException extends RuntimeException{

    public TarefaNotFoundException() {
        super("Tarefa não encontrada");
    }
}
