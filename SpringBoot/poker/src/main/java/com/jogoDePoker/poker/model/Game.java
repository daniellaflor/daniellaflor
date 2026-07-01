package com.jogoDePoker.poker.model;

import com.jogoDePoker.poker.model.enums.GameStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "games")
@Data
public class Game {

        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToMany
        @JoinTable(
                name = "gamePlayers",
                joinColumns = @JoinColumn(name = "gameId"),
                inverseJoinColumns = @JoinColumn(name = "userId")
        )
        private List<User> jogadores;

        @ManyToOne
        @JoinColumn(name = "vencedorId")
        private User vencedor;

        @Column(nullable = false)
        private int pote;

        private LocalDateTime dataCriacao = LocalDateTime.now();

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private GameStatus status;
    }


