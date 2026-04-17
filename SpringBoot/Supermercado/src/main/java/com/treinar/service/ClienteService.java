package com.treinar.service;


import com.treinar.dto.ClienteRequestDTO;
import com.treinar.dto.ClienteResponseDTO;
import com.treinar.model.Cliente;
import com.treinar.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository repository;

    @Transactional
    public ClienteResponseDTO cadastrar(ClienteRequestDTO dto) {
        var cliente = new Cliente();
        cliente.setNome(dto.nome());
        cliente.setEmail(dto.email());
        cliente.setTelefone(dto.telefone());

        var salvo = repository.save(cliente);
        return toResponseDTO(salvo);
    }

    public List<ClienteResponseDTO> listarTodos() {
        return repository.findAll().stream().map(this::toResponseDTO).toList();
    }

    public Cliente buscarClienteEntity(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }

    private ClienteResponseDTO toResponseDTO(Cliente c) {
        return new ClienteResponseDTO(c.getId(), c.getNome(), c.getEmail(), c.getTelefone());
    }
}
