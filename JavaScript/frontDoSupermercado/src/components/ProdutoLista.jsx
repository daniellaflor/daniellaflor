// src/components/ProdutoLista.jsx
import React, { useState, useEffect } from 'react';
import { getProdutos, getProdutoEstoque, cadastrarProduto } from '../services/api';

function ProdutoLista() {
    const [produtos, setProdutos] = useState([]);     // lista produtos
    const [mostrarForm, setMostrarForm] = useState(false);  // mostra/esconde formulario
    const [novoProduto, setNovoProduto] = useState({ nome: '', descricao: '', preco: '', quantidadeEstoque: '' });
    const [detalhesProduto, setDetalhesProduto] = useState(null); // detalhe do produto selecionado

    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        try {
            const response = await getProdutos();
            setProdutos(response.data);
        } catch (err) {
            console.error('Erro ao carregar produtos:', err);
        }
    };

    const handleCadastrar = async (e) => {
        e.preventDefault();
        try {
            await cadastrarProduto({
                ...novoProduto,
                preco: parseFloat(novoProduto.preco),
                quantidadeEstoque: parseInt(novoProduto.quantidadeEstoque)
            });
            alert('Produto cadastrado!');
            setNovoProduto({ nome: '', descricao: '', preco: '', quantidadeEstoque: '' });
            setMostrarForm(false);
            carregarProdutos();
        } catch (err) {
            alert('Erro ao cadastrar produto');
        }
    };

    const verDetalhes = async (id) => {
        try {
            const response = await getProdutoEstoque(id);
            setDetalhesProduto(response.data);
        } catch (err) {
            alert('Erro ao carregar detalhes');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2> Produtos</h2>
                <button onClick={() => setMostrarForm(!mostrarForm)} style={styles.button}>
                    + Novo Produto
                </button>
            </div>

            {mostrarForm && (
                <form onSubmit={handleCadastrar} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={novoProduto.nome}
                        onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={novoProduto.descricao}
                        onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="number"
                        placeholder="Preço"
                        step="0.01"
                        value={novoProduto.preco}
                        onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Estoque"
                        value={novoProduto.quantidadeEstoque}
                        onChange={(e) => setNovoProduto({ ...novoProduto, quantidadeEstoque: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.buttonSalvar}>Salvar</button>
                </form>
            )}

            <table style={styles.table}>
                <thead>
                    <tr><th>ID</th><th>Nome</th><th>Preço</th><th>Estoque</th><th>Ações</th></tr>
                </thead>
                <tbody>
                    {produtos.map(produto => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.nome}</td>
                            <td>R$ {produto.preco?.toFixed(2)}</td>
                            <td>{produto.quantidadeEstoque}</td>
                            <td>
                                <button onClick={() => verDetalhes(produto.id)} style={styles.buttonPequeno}>
                                    🔍 Detalhes
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {detalhesProduto && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h3>Detalhes do Produto</h3>
                        <p><strong>ID:</strong> {detalhesProduto.id}</p>
                        <p><strong>Nome:</strong> {detalhesProduto.nome}</p>
                        <p><strong>Preço:</strong> R$ {detalhesProduto.preco?.toFixed(2)}</p>
                        <p><strong>Estoque:</strong> {detalhesProduto.estoque}</p>
                        <p><strong>Vendidos:</strong> {detalhesProduto.quantidade_vendida}</p>
                        <p><strong>Disponível:</strong> {detalhesProduto.disponivel ? 'Sim' : 'Não'}</p>
                        <button onClick={() => setDetalhesProduto(null)} style={styles.buttonFechar}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: { padding: '2rem' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
    button: { padding: '0.5rem 1rem', backgroundColor: '#70092b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    buttonSalvar: { padding: '0.5rem 1rem', backgroundColor: '#334d5e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    buttonPequeno: { padding: '0.25rem 0.5rem', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    buttonFechar: { padding: '0.5rem 1rem', backgroundColor: '#631810', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem' },
    form: { marginBottom: '1rem', padding: '1rem', border: '1px solid #4f95a1', borderRadius: '4px', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
    input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd', flex: '1' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '1rem' },
    modal: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', minWidth: '300px' }
};

export default ProdutoLista;


// Mostra lista de produtos

// Formulário para cadastrar novos produtos

// Botão para ver detalhes (estoque, vendidos)