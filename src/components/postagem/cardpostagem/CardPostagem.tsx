// Import do Link para navegação sem recarregar a página
import { Link } from 'react-router-dom'

// Import do modelo/type Postagem (define a estrutura: id, titulo, texto, data, usuario, tema...)
import type Postagem from '../../../models/Postagem'

// Interface das props que o componente espera receber
interface CardPostagensProps {
    postagem: Postagem          // ← obrigatório: um objeto completo de postagem
}

// Componente recebe props e desestrutura { postagem }
function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        // Caixa principal do cartão com borda, flex vertical e arredondado
        <div className='border-slate-900 border flex flex-col rounded overflow-hidden justify-between'>
            
            {/* Conteúdo superior */}
            <div>
                {/* Cabeçalho com foto e nome do autor */}
                <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
                    <img
                        src={postagem.usuario?.foto || 'https://via.placeholder.com/48'} // Sugestão: fallback se não tiver foto
                        className='h-12 rounded-full'
                        alt={postagem.usuario?.nome || 'Usuário'} />
                    <h3 className='text-lg font-bold text-center uppercase'>
                        {postagem.usuario?.nome || 'Anônimo'}
                    </h3>
                </div>

                {/* Informações da postagem */}
                <div className='p-4'>
                    {/* Título em destaque */}
                    <h4 className='text-lg font-semibold uppercase'>{postagem.titulo}</h4>
                    
                    {/* Conteúdo da postagem */}
                    <p>{postagem.texto}</p>
                    
                    {/* Tema associado */}
                    <p>Tema: {postagem.tema?.descricao || 'Sem tema'}</p>
                    
                    {/* Data formatada em português (muito bom uso do Intl!) */}
                    <p>Data: {new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(postagem.data))}</p>
                </div>
            </div>

            {/* Botões de ação */}
            <div className="flex">

                {/* Botão Editar – já com rota dinâmica! */}
                <Link 
                    to={`/editarpostagem/${postagem.id}`}  // ex: /editarpostagem/7
                    className='w-full text-white bg-indigo-400 hover:bg-indigo-800 
                               flex items-center justify-center py-2'
                >
                    <button>Editar</button>
                </Link>

                {/* Botão Deletar – ainda vazio, precisa completar */}
                <Link 
                    to={`/deletarpostagem/${postagem.id}`}  // ← Sugestão: completar assim
                    className='text-white bg-red-400 hover:bg-red-700 w-full 
                               flex items-center justify-center'
                >
                    <button>Deletar</button>
                </Link>

            </div>
        </div>
    )
}

export default CardPostagem