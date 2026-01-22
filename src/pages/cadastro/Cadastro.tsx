
// Tela de cadastro de novo usuário

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"; //useEffect: Redirecionar depois do cadastro; useState: guardar dados do formulário, loading e confirmação de senha
import { useNavigate } from "react-router-dom"; //Para redirecionar o usuário após o cadastro
import { ClipLoader } from "react-spinners"; //Spinner de loading
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service"; //Função do service que faz o POST /usuarios/cadastrar (backend)
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  // Estado com os dados do novo usuário
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  // Após cadastro bem-sucedido, o backend retorna id > 0 → redireciona para login
  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate("/"); // Volta para tela de login
  }

  // Atualiza os campos do usuário (nome, usuario, foto, senha)
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  // Atualiza só o campo de confirmação de senha (estado separado)
  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  // Função chamada ao submeter o formulário
  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validação simples antes de enviar
    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        // Chama o serviço que faz POST /usuarios/cadastrar
        // O setUsuario dentro do serviço atualiza o estado com o retorno do backend
        await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
        ToastAlerta("Usuário cadastrado com sucesso!", "success");
      } catch (error) {
        ToastAlerta("Erro ao cadastrar o usuário!", "error");
      }
    } else {
      ToastAlerta("Dados do usuário inconsistentes! Verifique as informações do cadastro.", "error");
      // Limpa só as senhas em caso de erro
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }

    setIsLoading(false);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      {/* Imagem de fundo (aparece só em telas grandes) */}
      <div
        className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat 
                   w-full min-h-screen bg-cover bg-center"
      ></div>

      {/* Formulário de cadastro */}
      <form
        className="flex justify-center items-center flex-col w-2/3 gap-3"
        onSubmit={cadastrarNovoUsuario}
      >
        <h2 className="text-slate-900 text-5xl">Cadastrar</h2>

        {/* Nome */}
        <div className="flex flex-col w-full">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.nome}
            onChange={atualizarEstado}
          />
        </div>

        {/* Usuário */}
        <div className="flex flex-col w-full">
          <label htmlFor="usuario">Usuário</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuário"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.usuario}
            onChange={atualizarEstado}
          />
        </div>

        {/* Foto (URL) */}
        <div className="flex flex-col w-full">
          <label htmlFor="foto">Foto (URL)</label>
          <input
            type="text"
            id="foto"
            name="foto"
            placeholder="Cole o link da imagem"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.foto}
            onChange={atualizarEstado}
          />
        </div>

        {/* Senha */}
        <div className="flex flex-col w-full">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha (mínimo 8 caracteres)"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.senha}
            onChange={atualizarEstado}
          />
        </div>

        {/* Confirmar senha */}
        <div className="flex flex-col w-full">
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirme a senha"
            className="border-2 border-slate-700 rounded p-2"
            value={confirmarSenha}
            onChange={handleConfirmarSenha}
          />
        </div>

        {/* Botões */}
        <div className="flex justify-around w-full gap-8">
          {/* Cancelar */}
          <button
            type="button" // importante: não é submit
            className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2"
            onClick={retornar}
          >
            Cancelar
          </button>

          {/* Cadastrar */}
          <button
            type="submit"
            className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2 flex justify-center"
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              <span>Cadastrar</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;