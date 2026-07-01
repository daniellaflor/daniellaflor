package com.gerenciar.gerenciadorDeTarefas.service;

import com.gerenciar.gerenciadorDeTarefas.dto.TarefaDTO;
import com.gerenciar.gerenciadorDeTarefas.exception.TarefaNotFoundException;
import com.gerenciar.gerenciadorDeTarefas.model.Status;
import com.gerenciar.gerenciadorDeTarefas.model.Tarefa;
import com.gerenciar.gerenciadorDeTarefas.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository repository;

    public Tarefa criar(TarefaDTO dto) {
        var tarefa = new Tarefa();
        tarefa.setTitulo(dto.titulo());
        tarefa.setDescricao(dto.descricao());
        tarefa.setStatus(dto.status());

        return repository.save(tarefa);
    }

    public List<Tarefa> listar() {
        return repository.findAll();
    }

    public Tarefa buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(TarefaNotFoundException::new);
    }

    public List<Tarefa> buscarPorStatus(Status status) {
        return repository.findByStatus(status);
    }

    public Tarefa atualizar(Long id, Tarefa nova) {
        Tarefa tarefa = buscarPorId(id);

        tarefa.setTitulo(nova.getTitulo());
        tarefa.setDescricao(nova.getDescricao());
        tarefa.setStatus(nova.getStatus());

        return repository.save(tarefa);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

}
