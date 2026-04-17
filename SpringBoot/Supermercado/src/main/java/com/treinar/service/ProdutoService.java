package com.treinar.service;


import com.treinar.dto.ProdutoRequestDTO;
import com.treinar.dto.ProdutoResponseDTO;
import com.treinar.model.Produto;
import com.treinar.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository repository;

    @Transactional
    public ProdutoResponseDTO cadastrar(ProdutoRequestDTO dto) {
        var produto = new Produto();
        produto.setNome(dto.nome());
        produto.setDescricao(dto.descricao());
        produto.setPreco(dto.preco());
        produto.setQuantidadeEstoque(dto.quantidadeEstoque());
        produto.setQuantidadeVendida(0);

        var salvo = repository.save(produto);
        return toResponseDTO(salvo);
    }

    public BigDecimal verPreco(Long id) {
        var produto = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        return produto.getPreco();
    }

    public Integer verEstoque(Long id) {
        var produto = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        return produto.getQuantidadeEstoque();
    }

    public Integer verVendidos(Long id) {
        var produto = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        return produto.getQuantidadeVendida();
    }

    public List<ProdutoResponseDTO> listarTodos() {
        return repository.findAll().stream().map(this::toResponseDTO).toList();
    }

    public Produto buscarProdutoEntity(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }

    @Transactional
    public void atualizarEstoque(Long id, Integer novaQuantidade) {
        var produto = buscarProdutoEntity(id);
        produto.setQuantidadeEstoque(novaQuantidade);
        repository.save(produto);
    }

    private ProdutoResponseDTO toResponseDTO(Produto p) {
        return new ProdutoResponseDTO(
                p.getId(), p.getNome(), p.getDescricao(),
                p.getPreco(), p.getQuantidadeEstoque(), p.getQuantidadeVendida()
        );
    }
}
