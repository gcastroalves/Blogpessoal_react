import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";  // Biblioteca de spinner de carregamento
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";

function Login() {

    const navigate = useNavigate();  // Para redirecionar o usuário

    // Pega as coisas que o AuthContext oferece, dados do usuário, função de login e se está carregando
    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    // Estado local para guardar os dados do formulário de login
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    // useEffect que monitora mudanças no token do usuário
    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario]) // Só executa quando o "usuario" mudar

    // Função para atualizar o estado local conforme o usuário digita
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,   // mantém os outros campos que já tinha
            [e.target.name]: e.target.value  // atualiza o campo que mudou
        })
    }

    //Quando clica em "Entrar" (submit do form)
    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()  // Evita o recarregamento da página ao enviar um formulário
        handleLogin(usuarioLogin) //// chama a função do contexto que faz o login de verdade
    }

// JSX que define a aparência da página de login
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
                {/*Formulário de login */}
                <form className="flex justify-center items-center flex-col w-1/2 gap-4" 
                    onSubmit={login}>

                    <h2 className="text-slate-900 text-5xl ">Entrar</h2>

                    {/* Campo Usuário */}
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            value = {usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    {/* Campo Senha */}
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value = {usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    {/* Botão Entrar */}
                    <button 
                        type='submit' 
                        className="rounded bg-indigo-400 flex justify-center
                                   hover:bg-indigo-900 text-white w-1/2 py-2">
                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                            <span>Entrar</span>
                        }
                    </button>

                    <hr className="border-slate-800 w-full" />

                   <p>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-indigo-800 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>

                {/* Imagem de fundo (aparece só em telas grandes) */}
                 <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat 
                            w-full min-h-screen bg-cover bg-center"
                ></div>
            </div>
        </>
    );
}

export default Login;