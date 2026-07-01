package com.jogoDePoker.poker.game;

import com.jogoDePoker.poker.model.enums.Naipe;
import com.jogoDePoker.poker.model.enums.Valor;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "cartas")
public class Carta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Valor valor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Naipe naipe;

    public Carta() {
    }

    public Carta(Valor valor, Naipe naipe) {
        this.valor = valor;
        this.naipe = naipe;
    }

    public int getForca() {
        return valor.getForca();
    }
}
