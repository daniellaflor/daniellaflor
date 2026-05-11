package com.projeto.ContaBanco.service;

import com.projeto.ContaBanco.dto.*;

import com.projeto.ContaBanco.model.Conta;
import com.projeto.ContaBanco.model.Movimentacao;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ContaService {

        private final Map<String, Conta> contas = new HashMap<>();

        public ContaResponseDTO criarConta(CriarContaDTO dto) {
            String id = UUID.randomUUID().toString();
            Conta conta = new Conta(id, dto.getTitular(), dto.getSaldoInicial(), dto.getLimiteSaque());
            contas.put(id, conta);

            ContaResponseDTO response = new ContaResponseDTO();
            response.setId(conta.getId());
            response.setTitular(conta.getTitular());
            response.setSaldo(conta.getSaldo());
            response.setLimiteSaque(conta.getLimiteSaque());
            return response;
        }

        public ContaResponseDTO consultarSaldo(String id) {
            Conta conta = buscarConta(id);

            ContaResponseDTO response = new ContaResponseDTO();
            response.setId(conta.getId());
            response.setTitular(conta.getTitular());
            response.setSaldo(conta.getSaldo());
            response.setLimiteSaque(conta.getLimiteSaque());
            return response;
        }

        public ContaResponseDTO depositar(String id, DepositoDTO dto) {
            Conta conta = buscarConta(id);

            if (dto.getValor() <= 0) {
                throw new RuntimeException("Valor do depósito deve ser positivo");
            }

            conta.setSaldo(conta.getSaldo() + dto.getValor());
            conta.adicionarMovimentacao("DEPOSITO", dto.getValor(), conta.getSaldo());

            ContaResponseDTO response = new ContaResponseDTO();
            response.setId(conta.getId());
            response.setTitular(conta.getTitular());
            response.setSaldo(conta.getSaldo());
            response.setLimiteSaque(conta.getLimiteSaque());
            return response;
        }

        public ContaResponseDTO sacar(String id, SaqueDTO dto) {
            Conta conta = buscarConta(id);

            if (dto.getValor() <= 0) {
                throw new RuntimeException("Valor do saque deve ser positivo");
            }

            if (dto.getValor() > conta.getLimiteSaque()) {
                throw new RuntimeException("Limite de saque é R$ " + conta.getLimiteSaque());
            }

            if (dto.getValor() > conta.getSaldo()) {
                throw new RuntimeException("Saldo insuficiente");
            }

            conta.setSaldo(conta.getSaldo() - dto.getValor());
            conta.adicionarMovimentacao("SAQUE", dto.getValor(), conta.getSaldo());

            ContaResponseDTO response = new ContaResponseDTO();
            response.setId(conta.getId());
            response.setTitular(conta.getTitular());
            response.setSaldo(conta.getSaldo());
            response.setLimiteSaque(conta.getLimiteSaque());
            return response;
        }

        public ExtratoResponseDTO extrato(String id) {
            Conta conta = buscarConta(id);

            ExtratoResponseDTO response = new ExtratoResponseDTO();
            response.setTitular(conta.getTitular());
            response.setIdConta(conta.getId());
            response.setSaldoAtual(conta.getSaldo());
            response.setMovimentacoes(conta.getExtrato().stream()
                    .map(this::converterParaDTO)
                    .collect(Collectors.toList()));

            return response;
        }

        private Conta buscarConta(String id) {
            Conta conta = contas.get(id);
            if (conta == null) {
                throw new RuntimeException("Conta não encontrada");
            }
            return conta;
        }

        private ExtratoResponseDTO.MovimentacaoDTO converterParaDTO(Movimentacao mov) {
            ExtratoResponseDTO.MovimentacaoDTO dto = new ExtratoResponseDTO.MovimentacaoDTO();
            dto.setData(mov.getData().toString());
            dto.setTipo(mov.getTipo());
            dto.setValor(mov.getValor());
            dto.setSaldoApos(mov.getSaldoApos());
            return dto;
        }


    }
