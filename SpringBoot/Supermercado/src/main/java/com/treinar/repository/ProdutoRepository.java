package com.treinar.repository;

import com.treinar.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByQuantidadeEstoque(Integer limite);

    @Query("SELECT p FROM Produto p WHERE p.quantidadeEstoque > 0 ORDER BY p.nome")
    List<Produto> findProdutosDisponiveis();

}
