import React, { useState, useEffect } from 'react';
import { 
    getProdutos, 
    getClientes, 
    realizarVenda, 
    getVendasPorProduto 
} from '../services/api';

function VendaForm() {
    const [produtos, setProdutos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [venda, setVenda] = useState({ produtoId: '', clienteId: '', quantidade: '' });
    const [vendasRealizadas, setVendasRealizadas] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        setLoading(true);
        try {
            console.log(' Carregando produtos e clientes...');
            const [prodRes, clientRes] = await Promise.all([
                getProdutos(),
                getClientes()
            ]);
            
            console.log('Produtos recebidos:', prodRes.data);
            console.log(' Clientes recebidos:', clientRes.data);
            
            setProdutos(Array.isArray(prodRes.data) ? prodRes.data : []);
            setClientes(Array.isArray(clientRes.data) ? clientRes.data : []);
            
            setMensagem({ texto: 'Dados carregados com sucesso!', tipo: 'success' });
            setTimeout(() => setMensagem({ texto: '', tipo: '' }), 3000);
        } catch (err) {
            console.error(' Erro ao carregar dados:', err);
            setMensagem({ texto: 'Erro ao carregar dados do servidor', tipo: 'error' });
            setProdutos([]);
            setClientes([]);
        } finally {
            setLoading(false);
        }
    };

    const handleVenda = async (e) => {
        e.preventDefault();
        
        if (!venda.produtoId || !venda.clienteId || !venda.quantidade) {
            setMensagem({ texto: 'Preencha todos os campos', tipo: 'error' });
            setTimeout(() => setMensagem({ texto: '', tipo: '' }), 3000);
            return;
        }
        
        const produtoSelecionado = produtos.find(p => p.id === parseInt(venda.produtoId));
        if (produtoSelecionado && parseInt(venda.quantidade) > produtoSelecionado.quantidadeEstoque) {
            setMensagem({ 
                texto: `Estoque insuficiente! Disponível: ${produtoSelecionado.quantidadeEstoque}`, 
                tipo: 'error' 
            });
            setTimeout(() => setMensagem({ texto: '', tipo: '' }), 3000);
            return;
        }
        
        setLoading(true);
        try {
            console.log(' Realizando venda:', {
                produtoId: venda.produtoId,
                clienteId: venda.clienteId,
                quantidade: venda.quantidade
            });
            
            const response = await realizarVenda(
                venda.produtoId, 
                venda.clienteId, 
                venda.quantidade
            );
            
            console.log('✅ Venda realizada:', response.data);
            setMensagem({ texto: response.data.mensagem || ' Venda realizada com sucesso!', tipo: 'success' });
            
            setVenda({ ...venda, quantidade: '' });
            
            await verVendasProduto(venda.produtoId);
            
            const prodRes = await getProdutos();
            setProdutos(Array.isArray(prodRes.data) ? prodRes.data : []);
            
            setTimeout(() => setMensagem({ texto: '', tipo: '' }), 3000);
        } catch (err) {
            console.error(' Erro na venda:', err);
            const erroMsg = err.response?.data?.message || 
                           err.response?.data?.mensagem || 
                           'Erro ao realizar venda';
            setMensagem({ texto: ` ${erroMsg}`, tipo: 'error' });
            setTimeout(() => setMensagem({ texto: '', tipo: '' }), 4000);
        } finally {
            setLoading(false);
        }
    };

    const verVendasProduto = async (produtoId) => {
        if (!produtoId) {
            setVendasRealizadas([]);
            setProdutoSelecionado(null);
            return;
        }
        
        try {
            console.log(` Buscando vendas do produto ${produtoId}...`);
            const response = await getVendasPorProduto(produtoId);
            console.log(' Vendas recebidas:', response.data);
            
            const vendasData = Array.isArray(response.data) ? response.data : [];
            setVendasRealizadas(vendasData);
            
            const produto = produtos.find(p => p.id === parseInt(produtoId));
            setProdutoSelecionado(produto);
            
            if (vendasData.length === 0) {
                console.log(' Nenhuma venda encontrada para este produto');
            }
        } catch (err) {
            console.error(' Erro ao buscar vendas do produto:', err);
            setVendasRealizadas([]);
            setProdutoSelecionado(null);
        }
    };

    const handleProdutoChange = (e) => {
        const produtoId = e.target.value;
        setVenda({ ...venda, produtoId, quantidade: '' });  
        if (produtoId) {
            verVendasProduto(produtoId);
        } else {
            setVendasRealizadas([]);
            setProdutoSelecionado(null);
        }
    };

    if (loading && produtos.length === 0 && clientes.length === 0) {
        return (
            <div style={styles.loading}>
                <div> Carregando dados...</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h2> Realizar Venda</h2>
            
            {mensagem.texto && (
                <div style={mensagem.tipo === 'success' ? styles.successMessage : styles.errorMessage}>
                    {mensagem.texto}
                </div>
            )}
            
            <form onSubmit={handleVenda} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Produto:</label>
                    <select
                        value={venda.produtoId}
                        onChange={handleProdutoChange}
                        style={styles.select}
                        required
                        disabled={loading}
                    >
                        <option value="">Selecione o Produto</option>
                        {produtos.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.nome} - R$ {p.preco?.toFixed(2)} (Estoque: {p.quantidadeEstoque || 0})
                            </option>
                        ))}
                    </select>
                </div>
                
                <div style={styles.formGroup}>
                    <label style={styles.label}>Cliente:</label>
                    <select
                        value={venda.clienteId}
                        onChange={(e) => setVenda({ ...venda, clienteId: e.target.value })}
                        style={styles.select}
                        required
                        disabled={loading}
                    >
                        <option value="">Selecione o Cliente</option>
                        {clientes.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.nome} - {c.email}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div style={styles.formGroup}>
                    <label style={styles.label}>Quantidade:</label>
                    <input
                        type="number"
                        placeholder="Quantidade"
                        value={venda.quantidade}
                        onChange={(e) => setVenda({ ...venda, quantidade: e.target.value })}
                        style={styles.input}
                        required
                        min="1"
                        disabled={loading || !venda.produtoId}
                    />
                </div>
                
                <button 
                    type="submit" 
                    style={loading ? styles.buttonDisabled : styles.button}
                    disabled={loading}
                >
                    {loading ? ' Processando...' : ' Realizar Venda'}
                </button>
            </form>

            {produtoSelecionado && (
                <div style={styles.vendasSection}>
                    <h3>Vendas do Produto: {produtoSelecionado.nome}</h3>
                    <div style={styles.produtoInfo}>
                        <span> Preço: R$ {produtoSelecionado.preco?.toFixed(2)}</span>
                        <span> Estoque atual: {produtoSelecionado.quantidadeEstoque}</span>
                    </div>
                    
                    {!Array.isArray(vendasRealizadas) || vendasRealizadas.length === 0 ? (
                        <p style={styles.noData}>Nenhuma venda realizada para este produto ainda.</p>
                    ) : (
                        <div style={styles.tableWrapper}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Cliente</th>
                                        <th>Quantidade</th>
                                        <th>Valor Unitário</th>
                                        <th>Valor Total</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendasRealizadas.map((vendaItem, index) => (
                                        <tr key={vendaItem.id || index}>
                                            <td>{vendaItem.cliente?.nome || `Cliente #${vendaItem.clienteId}`}</td>
                                            <td>{vendaItem.quantidade}</td>
                                            <td>R$ {(vendaItem.produto?.preco || produtoSelecionado.preco || 0).toFixed(2)}</td>
                                            <td>R$ {((vendaItem.produto?.preco || produtoSelecionado.preco || 0) * vendaItem.quantidade).toFixed(2)}</td>
                                            <td>{new Date(vendaItem.dataVenda).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: { 
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
    },
    form: { 
        marginBottom: '2rem', 
        padding: '1.5rem', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    formGroup: {
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    label: {
        fontWeight: 'bold',
        color: '#333'
    },
    select: { 
        padding: '0.75rem', 
        borderRadius: '4px', 
        border: '1px solid #ace1f1', 
        fontSize: '1rem',
        backgroundColor: 'white'
    },
    input: { 
        padding: '0.75rem', 
        borderRadius: '4px', 
        border: '1px solid #1e2a63', 
        fontSize: '1rem'
    },
    button: { 
        padding: '0.75rem 1.5rem', 
        backgroundColor: '#11155a', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
        width: '100%',
        marginTop: '1rem'
    },
    buttonDisabled: { 
        padding: '0.75rem 1.5rem', 
        backgroundColor: '#000000', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'not-allowed',
        fontSize: '1rem',
        fontWeight: 'bold',
        width: '100%',
        marginTop: '1rem'
    },
    vendasSection: { 
        marginTop: '2rem',
        padding: '1rem',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#f8f5f5'
    },
    produtoInfo: {
        display: 'flex',
        gap: '2rem',
        padding: '1rem',
        backgroundColor: '#b3d4df',
        borderRadius: '4px',
        marginBottom: '1rem',
        fontWeight: 'bold'
    },
    tableWrapper: {
        overflowX: 'auto'
    },
    table: { 
        width: '100%', 
        borderCollapse: 'collapse', 
        marginTop: '1rem',
        fontSize: '0.9rem'
    },
    tableTh: {
        border: '1px solid #fcfcfc',
        padding: '12px',
        backgroundColor: '#ffffff',
        textAlign: 'left',
        fontWeight: 'bold'
    },
    tableTd: {
        border: '1px solid #f0e4e4',
        padding: '12px'
    },
    loading: {
        textAlign: 'center',
        padding: '3rem',
        fontSize: '1.2rem',
        color: '#5a3b3b'
    },
    successMessage: {
        backgroundColor: '#d4edda',
        color: '#000000',
        padding: '12px',
        borderRadius: '4px',
        marginBottom: '1rem',
        textAlign: 'center',
        border: '1px solid #15e746'
    },
    errorMessage: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '12px',
        borderRadius: '4px',
        marginBottom: '1rem',
        textAlign: 'center',
        border: '1px solid #f3d9dc'
    },
    noData: {
        textAlign: 'center',
        padding: '2rem',
        color: '#666',
        fontStyle: 'italic',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px'
    }
};

styles.tableTh = { ...styles.tableTd, backgroundColor: '#f0f7f1', fontWeight: 'bold' };

export default VendaForm;