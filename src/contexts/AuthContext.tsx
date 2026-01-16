import { createContext, type ReactNode, useState } from "react"
import type UsuarioLogin from "../models/UsuarioLogin" 
import { login } from "../services/Service" 

// INTERFACE do contexto de autenticação
// Define quais propriedades e funções estarão disponíveis no contexto
interface AuthContextProps {
    usuario: UsuarioLogin           // Dados do usuário logado (ou objeto vazio se não logado)
    handleLogout(): void            // Função para fazer logout (não retorna nada)
    handleLogin(usuario: UsuarioLogin): Promise<void> // Função assíncrona para fazer login
    isLoading: boolean              // Indica se está processando login (mostrar spinner/loading)
}

// INTERFACE para as props do Provider
// Define que o AuthProvider recebe children (componentes filhos)
interface AuthProviderProps {
    children: ReactNode  // ReactNode = qualquer coisa que o React pode renderizar
}

// Criação do Contexto com TypeScript
// createContext({} as AuthContextProps) = cria contexto com valor inicial vazio
// O "as AuthContextProps" é uma type assertion para TypeScript
export const AuthContext = createContext({} as AuthContextProps)

// COMPONENTE PROVIDER - "Provedor" do contexto
// Envolve a aplicação/parte dela para fornecer o contexto
export function AuthProvider({ children }: AuthProviderProps) {

    // ESTADO: dados do usuário logado
    // Inicializado com valores padrão (vazios/zerados = usuário não logado)
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",  // username
        senha: "",
        foto: "",
        token: ""     // Token JWT para autenticação em requisições futuras
    })

    // ESTADO: controle de carregamento durante o login
    const [isLoading, setIsLoading] = useState(false)

    // FUNÇÃO ASSÍNCRONA: realizar login
    // Recebe um objeto UsuarioLogin com credenciais
    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true) // Ativa o estado de carregamento
        
        try {
            // Chama o serviço de API para login
            // Parâmetros: endpoint, dados do login, função para atualizar estado
            await login(`/usuarios/logar`, usuarioLogin, setUsuario)
            
            // Feedback positivo para o usuário
            alert("O Usuário foi autenticado com sucesso!")
            
        } catch (error) {
            // Se a API retornar erro (credenciais inválidas, etc.)
            alert("Os Dados do usuário estão inconsistentes!")
        }
        
        setIsLoading(false) // Desativa carregamento (sucesso ou erro)
    }

    // FUNÇÃO: fazer logout
    function handleLogout() {
        // Reseta o estado do usuário para valores iniciais
        // Isso efetivamente "desloga" o usuário
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
        // NOTA: Em uma implementação real, você também deveria:
        // 1. Remover token do localStorage/sessionStorage
        // 2. Invalidar sessão no backend
        // 3. Redirecionar para página de login
    }

    // RETORNO do Provider
    return (
        // AuthContext.Provider "fornece" os valores para componentes filhos
        // value = objeto com tudo que será disponibilizado no contexto
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}  {/* Renderiza os componentes filhos envolvidos */}
        </AuthContext.Provider>
    )
}