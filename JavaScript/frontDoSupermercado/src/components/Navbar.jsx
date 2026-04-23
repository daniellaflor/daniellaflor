import React from 'react';

function Navbar({ activeTab, setActiveTab, onLogout }) {
    const tabs = [
        { id: 'produtos', nome: ' Produtos' },
        { id: 'clientes', nome: ' Clientes' },
        { id: 'vendas', nome: ' Vendas' },
        { id: 'relatorios', nome: ' Relatórios' }
    ];

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}> Supermercado</div>
            <div style={styles.tabs}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            ...styles.tab,
                            ...(activeTab === tab.id ? styles.tabActive : {})
                        }}
                    >
                        {tab.nome}
                    </button>
                ))}
            </div>
            <button onClick={onLogout} style={styles.logout}>
                 Sair
            </button>
        </nav>
    );
}

const styles = {
    nav: {
        backgroundColor: '#2c3e50',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white'
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    tabs: {
        display: 'flex',
        gap: '1rem'
    },
    tab: {
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        borderRadius: '4px',
        fontSize: '1rem'
    },
    tabActive: {
        backgroundColor: '#3498db'
    },
    logout: {
        padding: '0.5rem 1rem',
        backgroundColor: '#501009',
        border: 'none',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default Navbar;