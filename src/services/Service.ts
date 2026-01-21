//Arquivo de comunicação com o backend

import axios from "axios"; // Importa o axios para fazer requisições HTTP (GET, POST, etc.) 

// Criamos uma instância do axios já com o endereço base do nosso backend
// Assim não precisamos repetir o link longo toda vez que formos fazer uma requisição
const api = axios.create({
    baseURL: 'https://blogpessoal-nest-fxxr.onrender.com'
})

// Função para cadastrar usuário novo
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    // Faz POST → envia os dados do formulário para o servidor
    const resposta = await api.post(url, dados)
    //Salva a resposta (dados do usuário cadastrado) no estado do componente
    setDados(resposta.data)
}

// Função para fazer login
export const login = async (url: string, dados: Object, setDados: Function) => {
    //POST com os dados de login (usuário e senha)
    const resposta = await api.post(url, dados)
    //Salva os dados do usuário logado no estado do componente
    setDados(resposta.data)
}

// Função para buscar dados (GET)
export const buscar = async (url: string, setDados: Function, header: Object) => {
    //GET para buscar os dados no servidor
    const resposta = await api.get(url, header)
    //Salva os dados buscados (array de temas, posts, etc.) no estado do componente
    setDados(resposta.data)
}

//Cadastrar ou atualizar temas e posts (POST e PUT)
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}
export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)
}