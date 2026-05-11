package com.projeto.ContaBanco.controller;

import com.projeto.ContaBanco.dto.*;

import com.projeto.ContaBanco.service.ContaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/contas")
public class ContaController {

        @Autowired
        private ContaService contaService;

        @PostMapping
        public ResponseEntity<ContaResponseDTO> criarConta(@Valid @RequestBody CriarContaDTO dto) {
            ContaResponseDTO response = contaService.criarConta(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }

        @GetMapping("/{id}/saldo")
        public ResponseEntity<ContaResponseDTO> consultarSaldo(@PathVariable String id) {
            ContaResponseDTO response = contaService.consultarSaldo(id);
            return ResponseEntity.ok(response);
        }

        @PostMapping("/{id}/depositar")
        public ResponseEntity<ContaResponseDTO> depositar(@PathVariable String id, @Valid @RequestBody DepositoDTO dto) {
            ContaResponseDTO response = contaService.depositar(id, dto);
            return ResponseEntity.ok(response);
        }

        @PostMapping("/{id}/sacar")
        public ResponseEntity<ContaResponseDTO> sacar(@PathVariable String id, @Valid @RequestBody SaqueDTO dto) {
            ContaResponseDTO response = contaService.sacar(id, dto);
            return ResponseEntity.ok(response);
        }

        @GetMapping("/{id}/extrato")
        public ResponseEntity<ExtratoResponseDTO> extrato(@PathVariable String id) {
            ExtratoResponseDTO response = contaService.extrato(id);
            return ResponseEntity.ok(response);
        }
    }


