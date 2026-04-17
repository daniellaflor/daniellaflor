package com.treinar.repository;

import com.treinar.model.Cliente;
import com.treinar.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VendaRepository extends JpaRepository<Venda, Long> {

    List<Venda> findByProdutoId(Long produtoId);

    List<Venda> findByClienteId(Long clienteId);

    @Query("SELECT v.cliente FROM Venda v WHERE v.produto.id = :produtoId")
    List<Cliente> findClientesByProdutoId(Long produtoId);

    @Query("SELECT COUNT(v) FROM Venda v WHERE v.produto.id = :produtoId")
    Long countVendasByProdutoId(Long produtoId);


}
