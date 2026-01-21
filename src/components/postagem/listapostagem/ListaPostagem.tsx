// Hooks + navegação + spinner + contexto + modelo + service + componente filho
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import CardPostagem from "../cardpostagem/CardPostagem";
import type Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";

function ListaPostagens() {
    const navigate = useNavigate();                        // Redirecionamento
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading
    const [postagens, setPostagens] = useState<Postagem[]>([]); // Lista de posts, inicialmente vazia

    // Pega o usuário e a função de logout do contexto
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // Proteção: sem token → home
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!');
            navigate('/');
        }
    }, [token]);

    // Busca postagens automaticamente
    useEffect(() => {
        buscarPostagens();
    }, [postagens.length]);  // ← Sugestão: trocar por [] ou [token]

    async function buscarPostagens() {
        try {
            setIsLoading(true);
            await buscar('/postagens', setPostagens, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();  // Token inválido → logout
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {/* Spinner centralizado enquanto carrega */}
            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader color="#312e81" size={32} />
                </div>
            )}

            {/* Área principal */}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">

                    {/* Mensagem quando não tem postagens */}
                    {(!isLoading && postagens.length === 0) && (
                        <span className="text-3xl text-center my-8">
                            Nenhuma Postagem foi encontrada!
                        </span>
                    )}

                    {/* Grade responsiva de cartões */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {postagens.map((postagem) => (
                            <CardPostagem 
                                key={postagem.id} 
                                postagem={postagem} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaPostagens;