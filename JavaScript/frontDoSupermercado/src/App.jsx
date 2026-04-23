import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ProdutoLista from './components/ProdutoLista';
import ClienteForm from './components/ClienteForm';
import VendaForm from './components/VendaForm';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);    // controla se o usuario está logado
    const [activeTab, setActiveTab] = useState('produtos');     // controla qual aba esta ativa

    useEffect(() => {           // roda quando o componente carrega
        const token = localStorage.getItem('token');         // verifica se tem token salvo no localStorange
        if (token) {
            setIsAuthenticated(true);        // usuario esta logado 
        }
    }, []);

    const handleLogout = () => {          // funçao para logout
        localStorage.removeItem('token');    // remove o token
        setIsAuthenticated(false);           // usuario deslogado
    };

    if (!isAuthenticated) {       // se não estiver logado, mostra tela de login
        return <Login onLogin={() => setIsAuthenticated(true)} />;
    }

    return (          // Menu de navegação   //Conteúdo baseado na aba selecionada 

        <div>

            <Navbar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                onLogout={handleLogout} 
            />
            
            <div style={{ padding: '20px' }}>
                {activeTab === 'produtos' && <ProdutoLista />}
                {activeTab === 'clientes' && <ClienteForm />}
                {activeTab === 'vendas' && <VendaForm />}
            </div>
        </div>
    );
}

const styles = {
    content: {
        padding: '20px',
        backgroundColor: '#f5f5f5',
        minHeight: 'calc(100vh - 70px)'
    },
    relatorios: {
        textAlign: 'center',
        padding: '2rem',
        fontSize: '1.2rem',
        color: '#1c1650'
    }
};

export default App;



// Gerencia se o usuário está logado

// Mostra login ou o sistema principal

// Controla qual aba está ativa (produtos, clientes, vendas)

