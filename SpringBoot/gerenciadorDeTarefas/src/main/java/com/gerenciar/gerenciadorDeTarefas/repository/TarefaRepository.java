package com.gerenciar.gerenciadorDeTarefas.repository;

import com.gerenciar.gerenciadorDeTarefas.model.Status;
import com.gerenciar.gerenciadorDeTarefas.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

    List<Tarefa> findByStatus(Status status);

}
