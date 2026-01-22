// Hooks do React + navegação + spinner + contexto + modelo + service
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTema() {
    const navigate = useNavigate();                     // Para redirecionar páginas

    // Estado do formulário (dados do tema)
    const [tema, setTema] = useState<Tema>({} as Tema);

    // Controla loading no botão
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { usuario, handleLogout } = useContext(AuthContext); // Pega dados do usuário logado e função de logout(sair)
    const token = usuario.token;                    // Pega o token JWT para autenticação

    // Pega o ID da URL (ex: /editar-tema/5 → id = "5")
    const { id } = useParams<{ id: string }>();

    // Função que busca um tema específico pelo ID (para modo edição)
    async function buscarPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            // Se der 403 (token inválido) → logout
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    // Proteção: se não tiver token → avisa e manda pra home
    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/');
        }
    }, [token]);

    // Se tem ID na URL → busca o tema para preencher o formulário
    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    // Atualiza o estado ao digitar no input (formulário controlado)
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,                        // Mantém os outros campos
            [e.target.name]: e.target.value // Atualiza só o campo que mudou
        });
    }

    // Função que volta para a lista de temas
    function retornar() {
        navigate("/temas");
    }

    // Envia o formulário (cadastro ou edição)
    async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();                  // Evita reload da página
        setIsLoading(true);                  // Liga o spinner

        try {
            if (id !== undefined) {          // Modo EDIÇÃO
                await atualizar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                });
                ToastAlerta('O Tema foi atualizado com sucesso!', 'success');
            } else {                         // Modo CADASTRO
                await cadastrar(`/temas`, tema, setTema, {
                    headers: { 'Authorization': token }
                });
                ToastAlerta('O Tema foi cadastrado com sucesso!', 'success');
            }
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout();              // Token inválido → logout
            } else {
                ToastAlerta('Erro ao processar o tema.', 'error');
            }
        }

        setIsLoading(false);                 // Desliga spinner
        retornar();                          // Volta para /temas
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            {/* Título muda conforme o modo */}
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
            </h1>

            <form 
                className="w-1/2 flex flex-col gap-4" 
                onSubmit={gerarNovoTema}          // Chama a função ao submeter
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name="descricao"
                        className="border-2 border-slate-700 rounded p-2"
                        value={tema.descricao ?? ''}   // ?? '' evita erro se undefined
                        onChange={atualizarEstado}     // Atualiza ao digitar
                    />
                </div>

                <button
                    className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                               w-1/2 py-2 mx-auto flex justify-center"
                    type="submit"
                    disabled={isLoading}              // Desabilita enquanto carrega (boa prática)
                >
                    {isLoading ? (
                        <ClipLoader color="#ffffff" size={24} />
                    ) : (
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormTema;