// src/components/ClienteForm.jsx
import React, { useState, useEffect } from 'react';
import { getClientes, cadastrarCliente } from '../services/api';

function ClienteForm() {
    const [clientes, setClientes] = useState([]);
    const [novoCliente, setNovoCliente] = useState({ nome: '', email: '', telefone: '' });

    useEffect(() => {
        carregarClientes();
    }, []);

    const carregarClientes = async () => {
        try {
            const response = await getClientes();
            setClientes(response.data);
        } catch (err) {
            console.error('Erro:', err);
        }
    };

    const handleCadastrar = async (e) => {
        e.preventDefault();
        try {
            await cadastrarCliente(novoCliente);
            alert('Cliente cadastrado!');
            setNovoCliente({ nome: '', email: '', telefone: '' });
            carregarClientes();
        } catch (err) {
            alert('Erro ao cadastrar cliente');
        }
    };

    return (
        <div style={styles.container}>
            <h2> Clientes</h2>
            
            <form onSubmit={handleCadastrar} style={styles.form}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={novoCliente.nome}
                    onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
                    style={styles.input}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={novoCliente.email}
                    onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    value={novoCliente.telefone}
                    onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Cadastrar Cliente</button>
            </form>

            <table style={styles.table}>
                <thead>
                    <tr><th>ID</th><th>Nome</th><th>Email</th><th>Telefone</th></tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    container: { padding: '2rem' },
    form: { marginBottom: '1rem', padding: '1rem', border: '1px solid #26006d', borderRadius: '4px', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
    input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #1e124b', flex: '1' },
    button: { padding: '0.5rem 1rem', backgroundColor: '#741515', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '1rem', border: '1px solid #abc5f7' }
};

export default ClienteForm;