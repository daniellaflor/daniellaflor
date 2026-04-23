import React, { useState } from 'react';
import { login, register } from '../services/api';

function Login({ onLogin }) {        // armazena oq o usuario digita 
    const [isLogin, setIsLogin] = useState(true);           
    const [loginData, setLoginData] = useState({ login: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            if (isLogin) {
                console.log(loginData.login, loginData.password)
                const response = await login(loginData.login, loginData.password);      // salva token
                localStorage.setItem('token', response.data.token);
                onLogin();
            } else {
                await register(loginData.login, loginData.password);
                alert('Usuário cadastrado! Faça login.');
                setIsLogin(true);   // muda para tela de login automaticamente
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Erro na autenticação');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}> Supermercado</h1>
                <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>
                
                {error && <p style={styles.error}>{error}</p>}
                
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={loginData.login}
                        onChange={(e) => setLoginData({ ...loginData, login: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={styles.button}>
                        {isLogin ? 'Entrar' : 'Cadastrar'}
                    </button>
                </form>
                
                <p style={styles.switch}>
                    {isLogin ? 'Não tem conta? ' : 'Já tem conta? '}
                    <button onClick={() => setIsLogin(!isLogin)} style={styles.linkButton}>
                        {isLogin ? 'Cadastre-se' : 'Faça login'}
                    </button>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#30368d'
    },
    card: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(57, 133, 163, 0.42)',
        width: '100%',
        maxWidth: '400px'
    },
    title: {
        textAlign: 'center',
        color: '#04519e',
        marginBottom: '1rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    input: {
        padding: '0.75rem',
        borderRadius: '4px',
        border: '1px solid #8fa8b3',
        fontSize: '1rem'
    },
    button: {
        padding: '0.75rem',
        backgroundColor: '#134261',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer'
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '1rem'
    },
    switch: {
        textAlign: 'center',
        marginTop: '1rem'
    },
    linkButton: {
        background: 'none',
        border: 'none',
        color: '#660f0f',
        cursor: 'pointer',
        textDecoration: 'underline'
    }
};

export default Login;



// Mostra formulário de login ou cadastro

// Envia dados para o backend

// Salva o token quando login é bem-sucedido

