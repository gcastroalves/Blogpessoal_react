import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";  // Spinner de carregamento
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import CardTema from "../cardtema/CardTema";

// Componente que lista todos os temas
function ListaTemas() {

    const navigate = useNavigate(); // Ferramenta para navegar entre páginas

    const [isLoading, setIsLoading] = useState<boolean>(false) // Controla o carregamento

    const [temas, setTemas] = useState<Tema[]>([]) // Estado que guarda os temas buscados, vindos do backend

    const { usuario, handleLogout } = useContext(AuthContext) // Pega dados do usuário logado e função de logout(sair)
    const token = usuario.token                     // Pega o token JWT para autenticação


    // Proteção: se não tiver token → manda pra home
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    // Busca os temas automaticamente ao carregar (e quando temas mudar)
    useEffect(() => {
        buscarTemas()    
    }, [temas.length])

    // Função que realmente busca os temas no backend
    async function buscarTemas() {
        try {

            setIsLoading(true) // Começa o carregamento

            // Chama o serviço que faz a requisição GET para buscar os temas
            await buscar('/temas', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            // Se der erro 401 (token inválido/expirado) → logout
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }finally {
            setIsLoading(false)  //Desliga spinner sempre
        }
    }

    return (
        <>
            {/* Spinner enquanto carrega */}
            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader
                        color="#312e81"
                        size={32}
                    />
                </div>
            )}

            {/* Área principal da lista */}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">

                    {/* Mensagem quando não tem temas */}
                    {(!isLoading && temas.length === 0) && (
                            <span className="text-3xl text-center my-8">
                                Nenhum Tema foi encontrado!
                            </span>
                    )}

                    {/* Grade responsiva de cartões */}
                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                            {
                                // Mapeia o array de temas e cria um CardTema para cada tema
                                temas.map((tema) => ( 
                                    <CardTema key={tema.id} tema={tema}/> 
                                ))
                            }
                    </div>
                </div>
            </div>
        </>
    )
}
export default ListaTemas;