package com.treinar.controller;

import com.treinar.model.Venda;
import com.treinar.service.VendaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/vendas")
@RequiredArgsConstructor
public class VendaController {

    private final VendaService service;

    @PostMapping
    public ResponseEntity<Map<String, String>> vender(
            @RequestParam Long produtoId,
            @RequestParam Long clienteId,
            @RequestParam Integer quantidade) {
        String resultado = service.realizarVenda(produtoId, clienteId, quantidade);
        return ResponseEntity.ok(Map.of("mensagem", resultado));
    }

    @GetMapping("/produto/{produtoId}")
    public ResponseEntity<List<Venda>> quemComprou(@PathVariable Long produtoId) {
        return ResponseEntity.ok(service.quemComprou(produtoId));
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<Venda>> vendasPorCliente(@PathVariable Long clienteId) {
        return ResponseEntity.ok(service.listarVendasPorCliente(clienteId));
    }
}
