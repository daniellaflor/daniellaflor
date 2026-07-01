package com.gerenciar.gerenciadorDeTarefas.controller;

import com.gerenciar.gerenciadorDeTarefas.dto.TarefaDTO;
import com.gerenciar.gerenciadorDeTarefas.model.Status;
import com.gerenciar.gerenciadorDeTarefas.model.Tarefa;
import com.gerenciar.gerenciadorDeTarefas.service.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tarefa")
public class TarefaController {

    @Autowired
    private TarefaService service;

    @PostMapping
    public Tarefa criar(@RequestBody TarefaDTO dto) {
        return service.criar(dto);
    }

    @GetMapping
    public List<Tarefa> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Tarefa buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @GetMapping("/status/{status}")
    public List<Tarefa> porStatus(@PathVariable Status status) {
        return service.buscarPorStatus(status);
    }

    @PutMapping("/{id}")
    public Tarefa atualizar(@PathVariable Long id, @RequestBody TarefaDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
