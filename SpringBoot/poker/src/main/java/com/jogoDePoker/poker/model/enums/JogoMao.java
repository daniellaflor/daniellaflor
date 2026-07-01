package com.jogoDePoker.poker.model.enums;

public enum JogoMao {

    QUADRA(7),
    FULL_HOUSE(6),
    FLUSH(5),
    SEQUENCIA(4),
    TRINCA(3),
    DOIS_PARES(2),
    PAR(1),
    CARTA_ALTA(0);

    private final int forca;

    JogoMao(int forca) {
        this.forca = forca;
    }

    public int getForca() {
        return forca;
    }
}
