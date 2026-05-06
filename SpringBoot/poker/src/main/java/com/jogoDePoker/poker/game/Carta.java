package com.jogoDePoker.poker.game;

import com.jogoDePoker.poker.model.enums.Naipe;
import com.jogoDePoker.poker.model.enums.Valor;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Table("/game")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Naipe naipe;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Valor valor;
}
