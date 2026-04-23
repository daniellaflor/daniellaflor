import axios from "axios";

const api = axios.create({           // cria uma instancia de axios com configuração padrao
  baseURL: "http://localhost:8080",   // conexão com o backend
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(      // adiciona token automaticamente em todas as requisiçoẽs
  (config) => {
    console.log(
      `Fazendo requisição: ${config.method?.toUpperCase()} ${config.url}`,
    );
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(" Token adicionado ao header");
    }
    return config;
  },
  (error) => {
    console.error(" Erro na requisição:", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(           // Interceptor para logar respostas

  (response) => {
    console.log(
      ` Resposta recebida: ${response.status} ${response.config.url}`,
    );
    return response;
  },
  (error) => {
    console.error(
      " Erro na resposta:",
      error.response?.status,
      error.response?.data,
    );
    return Promise.reject(error);
  },
);

// Auth
export const login = async (login, password) => {
  console.log(" Tentando login com:", login);
  return api.post("/auth/login", { login, password });
};

export const register = async (login, password) => {
  console.log(" Tentando cadastrar usuário:", login);
  return api.post("/auth/register", { login, password });
};

// Produtos
export const getProdutos = () => api.get("/produtos");
export const getProdutoEstoque = (id) => api.get(`/produtos/${id}/estoque`);
export const cadastrarProduto = (produto) => api.post("/produtos", produto);

// Clientes
export const getClientes = () => api.get("/clientes");
export const cadastrarCliente = (cliente) => api.post("/clientes", cliente);

// Vendas
export const realizarVenda = (produtoId, clienteId, quantidade) =>
  api.post(
    `/vendas?produtoId=${produtoId}&clienteId=${clienteId}&quantidade=${quantidade}`,
  );
export const getVendasPorProduto = (produtoId) =>
  api.get(`/vendas/produto/${produtoId}`);

export default api;


// Define a URL base do backend

// Adiciona token automaticamente

// Exporta funções para cada endpoint
