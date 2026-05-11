package com.projeto.ContaBanco.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Conta {

    private String id;
    private String titular;
    private double saldo;
    private double limiteSaque;
    private List<Movimentacao> extrato;

    public Conta(String id, String titular, double saldoInicial, double limiteSaque) {
        this.id = id;
        this.titular = titular;
        this.saldo = saldoInicial;
        this.limiteSaque = limiteSaque;
        this.extrato = new ArrayList<>();
        adicionarMovimentacao("CRIACAO", 0, saldoInicial);
    }

    public void adicionarMovimentacao(String tipo, double valor, double saldoApos) {
        Movimentacao mov = new Movimentacao(tipo, valor, saldoApos);
        extrato.add(mov);
    }
}
