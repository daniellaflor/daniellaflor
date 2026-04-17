package com.treinar.controller;

import com.treinar.dto.ProdutoRequestDTO;
import com.treinar.dto.ProdutoResponseDTO;
import com.treinar.service.ProdutoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/produtos")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService service;

    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> cadastrar(@Valid @RequestBody ProdutoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(dto));
    }

    @GetMapping("/{id}/preco")
    public ResponseEntity<Map<String, Object>> verPreco(@PathVariable Long id) {
        var response = new HashMap<String, Object>();
        response.put("produto_id", id);
        response.put("preco", service.verPreco(id));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/estoque")
    public ResponseEntity<Map<String, Object>> verEstoque(@PathVariable Long id) {
        var produto = service.buscarPorId(id);
        if (produto == null) {
            return ResponseEntity.notFound().build();
        }

        var response = new HashMap<String, Object>();
        response.put("id", id);
        response.put("nome", produto.getNome());
        response.put("preco", produto.getPreco());
        response.put("estoque", produto.getQuantidadeEstoque());
        response.put("quantidade_vendida", produto.getQuantidadeVendida());
        response.put("disponivel", produto.getQuantidadeEstoque() > 0);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/vendidos")
    public ResponseEntity<Map<String, Object>> verVendidos(@PathVariable Long id) {
        var response = new HashMap<String, Object>();
        response.put("produto_id", id);
        response.put("quantidade_vendida", service.verVendidos(id));
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ProdutoResponseDTO>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }
}
