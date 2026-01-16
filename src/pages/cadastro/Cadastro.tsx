// Importação de hooks, tipos, componentes e serviços necessários
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegação entre páginas
import { ClipLoader } from "react-spinners"; // Componente de loading/spinner
import type Usuario from "../../models/Usuario"; // Tipo/interface do usuário
import { cadastrarUsuario } from "../../services/Service"; // Serviço de API para cadastro

// Componente funcional de Cadastro
function Cadastro() {

  // Hook para navegação programática entre rotas
  const navigate = useNavigate()
  
  // Estado para controlar o carregamento durante a requisição
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Estado para armazenar a confirmação de senha
  const[confirmarSenha, setConfirmarSenha] = useState<string>("")

  // Estado principal que armazena os dados do usuário
  // Inicializado com valores padrão
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })
  
  // Efeito que executa quando o ID do usuário muda
  // Se o ID for diferente de 0 (usuário cadastrado), redireciona para home
  useEffect(() => {
    if (usuario.id !== 0){
      retornar()
    }
  }, [usuario]) // Dependência: executa quando 'usuario' muda

  // Função para retornar à página inicial
  function retornar(){
    navigate('/') // Navega para a rota raiz
  }

  // Função para atualizar os campos do usuário
  // Usa spread operator para manter outros campos e atualizar apenas o alterado
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
    setUsuario({
      ...usuario, // Mantém todos os valores atuais
      [e.target.name]: e.target.value // Atualiza dinamicamente o campo pelo 'name'
    })
  }

  // Função específica para atualizar o estado da confirmação de senha
  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(e.target.value)
  }

  // Função assíncrona para submeter o formulário de cadastro
  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
    e.preventDefault() // Previne comportamento padrão do formulário (recarregar página)

    // Validação: senhas coincidem E senha tem pelo menos 8 caracteres
    if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){

      setIsLoading(true) // Ativa o estado de carregamento

      try{
        // Chama o serviço de API para cadastrar usuário
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        alert('Usuário cadastrado com sucesso!') // Feedback positivo
      }catch(error){
        alert('Erro ao cadastrar o usuário!') // Feedback de erro
      }
    }else{
      // Se validação falhar: mostra alerta e limpa campos de senha
      alert('Dados do usuário inconsistentes! Verifique as informações do cadastro.')
      setUsuario({...usuario, senha: ''}) // Limpa senha mantendo outros dados
      setConfirmarSenha('') // Limpa confirmação de senha
    }

    setIsLoading(false) // Desativa carregamento (sucesso ou erro)
  }

  // JSX retornado pelo componente
  return (
    <>
      {/* Container principal com grid responsivo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold">
        
        {/* Coluna esquerda: imagem de background (visível apenas em desktop) */}
        <div
          className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat 
                    w-full min-h-screen bg-cover bg-center"
        ></div>
        
        {/* Coluna direita: formulário de cadastro */}
        <form className='flex justify-center items-center flex-col w-2/3 gap-3' 
              onSubmit={cadastrarNovoUsuario}> {/* Form submit chama a função */}

          <h2 className='text-slate-900 text-5xl'>Cadastrar</h2>
          
          {/* Campo: Nome */}
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome" // Corresponde à propriedade no estado 'usuario'
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.nome} // Valor vinculado ao estado
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} // Atualiza estado
            />
          </div>
          
          {/* Campo: Usuário (username/login) */}
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          
          {/* Campo: URL da foto */}
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          
          {/* Campo: Senha */}
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value = {usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          
          {/* Campo: Confirmar Senha (usa estado separado) */}
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)} // Função específica
            />
          </div>
          
          {/* Botões de ação */}
          <div className="flex justify-around w-full gap-8">
            {/* Botão Cancelar: limpa formulário e navega para home */}
            <button 
                type='reset'
                className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2'
                onClick={retornar}
             >
                Cancelar
            </button>
            
            {/* Botão Cadastrar: submete formulário */}
            <button 
                type='submit'
                className='rounded text-white bg-indigo-400 
                           hover:bg-indigo-900 w-1/2 py-2
                           flex justify-center' 
                >
                {/* Renderização condicional: spinner durante loading */}
                { isLoading ? 
                  <ClipLoader 
                    color="#ffffff" 
                    size={24}
                  /> : 
                  <span>Cadastrar</span>
                }
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

// Exporta o componente como default
export default Cadastro