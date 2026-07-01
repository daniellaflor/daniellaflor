package com.jogoDePoker.poker.model.enums;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ResultadoMao {

    private JogoMao jogoMao;
    private List<Integer> valoresDesempate;
}
