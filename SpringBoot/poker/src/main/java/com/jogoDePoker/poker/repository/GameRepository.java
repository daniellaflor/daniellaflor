package com.jogoDePoker.poker.repository;

import com.jogoDePoker.poker.model.Game;
import com.jogoDePoker.poker.model.enums.GameStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {

        List<Game> findByStatus(GameStatus status);

        List<Game> findByVencedor(User vencedor);
}


