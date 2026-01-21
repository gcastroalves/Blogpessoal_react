import { createContext, type ReactNode, useState } from "react"
import type UsuarioLogin from "../models/UsuarioLogin" 
import { login } from "../services/Service" 

// Define a "forma" (interface) do que o contexto vai oferecer para todos
interface AuthContextProps {
    usuario: UsuarioLogin          // Dados do usuário logado 
    handleLogout(): void           // Função para deslogar
    handleLogin(usuario: UsuarioLogin): Promise<void>  // Função para logar
    isLoading: boolean              // Controla se está carregando (útil pra mostrar spinner)
}

// Define a "forma" (interface) dos props que o AuthProvider vai receber
// Nesse caso, só recebe "children", que são os componentes filhos que ele vai envolver
interface AuthProviderProps {
    children: ReactNode  
}

// Cria o contexto com um valor inicial vazio (será preenchido no AuthProvider)
export const AuthContext = createContext({} as AuthContextProps)

// Componente que vai "embrulhar" toda a aplicação
export function AuthProvider({ children }: AuthProviderProps) {
    // Estado que guarda os dados do usuário logado
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",  
        senha: "",
        foto: "",
        token: ""     
    })

    // Estado que indica se está fazendo login (pra mostrar carregando)
    const [isLoading, setIsLoading] = useState(false)

    // Função principal: faz o login
    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)  // Começa o carregamento
        
        try {
            //Chama o serviço que conversa com o backend
            await login(`/usuarios/logar`, usuarioLogin, setUsuario)
            
            alert("O Usuário foi autenticado com sucesso!")
            
        } catch (error) {
            alert("Os Dados do usuário não correspondem!")
        }
        
        setIsLoading(false) //Terminou (com sucesso ou erro)
    }

    // Função para deslogar o usuário
    function handleLogout() {
        // Limpa os dados do usuário (volta ao estado inicial)
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
        
    }
    //Entrega tudo para os componentes filhos(children)
    return (
        
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}  
        </AuthContext.Provider>
    )
}