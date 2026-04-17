package com.treinar.service;

import com.treinar.model.Cliente;
import com.treinar.model.Produto;
import com.treinar.model.Venda;
import com.treinar.repository.ClienteRepository;
import com.treinar.repository.ProdutoRepository;
import com.treinar.repository.VendaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VendaService {

    private final VendaRepository vendaRepository;
    private final ProdutoService produtoService;
    private final ClienteService clienteService;

    @Transactional
    public String realizarVenda(Long produtoId, Long clienteId, Integer quantidade) {
        var produto = produtoService.buscarProdutoEntity(produtoId);
        var cliente = clienteService.buscarClienteEntity(clienteId);

        if (produto.getQuantidadeEstoque() < quantidade) {
            throw new RuntimeException("Estoque insuficiente. Disponível: " + produto.getQuantidadeEstoque());
        }

        produto.setQuantidadeEstoque(produto.getQuantidadeEstoque() - quantidade);
        produto.setQuantidadeVendida(produto.getQuantidadeVendida() + quantidade);

        Venda venda = new Venda();
        venda.setProduto(produto);
        venda.setCliente(cliente);
        venda.setQuantidade(quantidade);
        venda.setPrecoUnitario(produto.getPreco());
        venda.setValorTotal(produto.getPreco().multiply(BigDecimal.valueOf(quantidade)));

        vendaRepository.save(venda);

        return String.format("Venda realizada! Total: R$ %.2f", venda.getValorTotal());
    }

    public List<Venda> quemComprou(Long produtoId) {
        return vendaRepository.findByProdutoId(produtoId);
    }

    public List<Venda> listarVendasPorCliente(Long clienteId) {
        return vendaRepository.findByClienteId(clienteId);
    }
}
