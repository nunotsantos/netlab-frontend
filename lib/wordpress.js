import axios from 'axios';

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export const wpClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Funções para API com melhor tratamento de erro
export const getPosts = async () => {
  try {
    console.log('Tentando acessar:', API_URL + '/posts');
    const response = await wpClient.get('/posts');
    console.log('Resposta recebida:', response.status);
    return response.data;
  } catch (error) {
    console.error('Erro detalhado:');
    console.error('URL:', error.config?.url);
    console.error('Status:', error.response?.status);
    console.error('Mensagem:', error.message);
    return [];
  }
};

export const getPages = async () => {
  try {
    const response = await wpClient.get('/pages');
    return response.data;
  } catch (error) {
    console.error('Error fetching pages:', error.message);
    return [];
  }
};